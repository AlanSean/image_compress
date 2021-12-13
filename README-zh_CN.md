<p align="center">
    <img width="230" src="./favicon.512x512.png">
</p>

[![CI](https://github.com/AlanSean/image_compress/actions/workflows/lint-test-e2e-build.yml/badge.svg)](https://github.com/AlanSean/image_compress/actions/workflows/lint-test-e2e-build.yml)

[English](README.md) | 简体中文



# image_compress

基于 Electron，Angular，Node，Sharp 开发的 WEBP、PNG，JPEG图形压缩程序。
适用于Windows、MacOS和Linux。

## environment

```
//node@12.18.0
npm i -g @angular/cli
npm install 
npm run dev
```

## 任务
- [x] 批量压缩 500张不卡顿
- [x] 压缩进度条
- [x] jpg png webp
- [x] 可另存为
- [x] 输出目录可配置
- [x] 可拖动图片到*文件夹，直接复制到目的地。
- [ ] 压缩中，继续拖入图片或者文件夹自动加入到队列中
- [x] 现代化ui，每张图可单独优化
- [ ] 图片格式互转
- [ ] 文件信息提示(开发过程中发现,有的图片真实格式与当前格式不同)
- [ ] 图片压缩后上传(可配置)

## 依赖

- [模板](https://github.com/maximegris/angular-electron): 用Angular 11和Electron 12 引导并打包你的项目来创建桌面应用。
- [Angular](https://angular.cn/): Angular 是一个应用设计框架与开发平台，用于创建高效、复杂、精致的单页面应用。
- [Electron](https://www.electronjs.org/): 使用 JavaScript，HTML 和 CSS 构建跨平台的桌面应用程序
- [mozjpeg](https://github.com/mozilla/mozjpeg): mozjpeg是一种JPG压缩程序
- [pngquant](https://github.com/kornelski/pngquant): pngquant是一种PNG压缩程序
- [ng-zorro-antd](https://ng.ant.design/docs/introduce/zh): NG-ZORRO - 企业级 UI 设计语言和 Angular 组件库
- [execa](https://github.com/sindresorhus/execa): execa改进了child_process的方法
- [fs-extra](https://github.com/jprichardson/node-fs-extra): 给原生`fs`新增了文件系统方法，以及Promise
- [crypto-js](https://github.com/brix/crypto-js): 提供了各种加密算法x
- [sharp](https://github.com/lovell/sharp): 这个高速 Node.js 模块的典型用例是将常见格式的大图像转换为较小的、对网络友好的 JPEG、PNG、WebP 和不同尺寸的 AVIF 图像。
