# huskyrc

[docs](https://typicode.github.io/husky/#/?id=install-1)

## 手动配置


### init

```
npx husky install

```
### 绕过 pre-commit 检测

```
git commit -m "yolo!" --no-verify

没有 --no-verify  选项 也可以增加环境变量

HUSKY=0 git push # yolo!
```

### 在CI/Docker中禁用husky


检测是否在ci环境中
```
# .husky/pre-commit
# ...
[ -n "$CI" ] && exit 0

```


### test hooks

测试钩子，可以在代码里末尾添加 exit 1
```
# .husky/pre-commit
# ...
exit 1 # Commit will be aborted
```

### 恢复默认

```
git config gitflow.path.hooks .git/hooks
```

###  nvm，n，rbenv，pyenv 等管理node 找不到怎么办？

```
# ~/.huskyrc
# This loads nvm.sh and sets the correct PATH before running hook
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```


## cli式配置

### husky-init  是一次性命令，用于快速初始化项目

```
npx husky-init && npm install       # npm
npx husky-init && yarn              # Yarn 1
yarn dlx husky-init --yarn2 && yarn # Yarn 2
```


### 添加钩子
 
使用命令  `npx husky add `
```

npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```


## husky 插件

1. [pretty-quick](https://www.npmjs.com/package/pretty-quick): 提交自动美化代码
2. [lint-staged](https://www.npmjs.com/package/lint-staged):提交代码 根据配置检测代码
3. @commitlint/config-conventional和@commitlint/cli