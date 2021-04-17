# Github Action

## actions/cache

[actions/cache-docs](https://github.com/actions/cache/blob/main/examples.md)

或者直接点下方的链接，直接跳到相关cache的例子

- [Examples](https://github.com/actions/cache/edit/main/examples.md#examples)
  - [C# - NuGet](https://github.com/actions/cache/edit/main/examples.md#c---nuget)
  - [D - DUB](https://github.com/actions/cache/edit/main/examples.md#d---dub)
  - [Elixir - Mix](https://github.com/actions/cache/edit/main/examples.md#elixir---mix)
  - [Go - Modules](https://github.com/actions/cache/edit/main/examples.md#go---modules)
  - [Haskell - Cabal](https://github.com/actions/cache/edit/main/examples.md#haskell---cabal)
  - [Java - Gradle](https://github.com/actions/cache/edit/main/examples.md#java---gradle)
  - [Java - Maven](https://github.com/actions/cache/edit/main/examples.md#java---maven)
  - [Node - npm](https://github.com/actions/cache/edit/main/examples.md#node---npm)
    - [macOS and Ubuntu](https://github.com/actions/cache/edit/main/examples.md#macos-and-ubuntu)
    - [Windows](https://github.com/actions/cache/edit/main/examples.md#windows)
    - [Using multiple systems and `npm config`](https://github.com/actions/cache/edit/main/examples.md#using-multiple-systems-and-npm-config)
  - [Node - Lerna](https://github.com/actions/cache/edit/main/examples.md#node---lerna)
  - [Node - Yarn](https://github.com/actions/cache/edit/main/examples.md#node---yarn)
  - [Node - Yarn 2](https://github.com/actions/cache/edit/main/examples.md#node---yarn-2)
  - [OCaml/Reason - esy](https://github.com/actions/cache/edit/main/examples.md#ocamlreason---esy)
  - [PHP - Composer](https://github.com/actions/cache/edit/main/examples.md#php---composer)
  - [Python - pip](https://github.com/actions/cache/edit/main/examples.md#python---pip)
    - [Simple example](https://github.com/actions/cache/edit/main/examples.md#simple-example)
    - [Multiple OSes in a workflow](https://github.com/actions/cache/edit/main/examples.md#multiple-oss-in-a-workflow)
    - [Using pip to get cache location](https://github.com/actions/cache/edit/main/examples.md#using-pip-to-get-cache-location)
    - [Using a script to get cache location](https://github.com/actions/cache/edit/main/examples.md#using-a-script-to-get-cache-location)
  - [Python - pipenv](https://github.com/actions/cache/edit/main/examples.md#python---pipenv)
  - [R - renv](https://github.com/actions/cache/edit/main/examples.md#r---renv)
    - [Simple example](https://github.com/actions/cache/edit/main/examples.md#simple-example-1)
    - [Multiple OSes in a workflow](https://github.com/actions/cache/edit/main/examples.md#multiple-oss-in-a-workflow-1)
  - [Ruby - Bundler](https://github.com/actions/cache/edit/main/examples.md#ruby---bundler)
  - [Rust - Cargo](https://github.com/actions/cache/edit/main/examples.md#rust---cargo)
  - [Scala - SBT](https://github.com/actions/cache/edit/main/examples.md#scala---sbt)
  - [Swift, Objective-C - Carthage](https://github.com/actions/cache/edit/main/examples.md#swift-objective-c---carthage)
  - [Swift, Objective-C - CocoaPods](https://github.com/actions/cache/edit/main/examples.md#swift-objective-c---cocoapods)
  - [Swift - Swift Package Manager](https://github.com/actions/cache/edit/main/examples.md#swift---swift-package-manager)



##   矩阵 matrix

```
jobs:
  build:
    strategy:
      matrix:
        # 指定node版本 矩阵指定多版本
        node-version: [12.x, 14.x, 15.x]
         # 指定os 
        os: ['ubuntu-latest', 'windows-latest', 'macos-latest']
  # 用变量的形式，自动分配
  runs-on: ${{ matrix.os }}

   # 用变量的形式，自动分配
  - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}

  #有些任务是不能在其他环境运行的
  # 比如GabrielBB/xvfb-action@v1 只能在linux 下使用
  # 用if条件判断一下就好
  - name: Run headless unit test
      if: matrix.os == 'ubuntu-latest'
      uses: GabrielBB/xvfb-action@v1
      with:
        run: |
          yarn test
          yarn e2e

  # node 后续任务
```