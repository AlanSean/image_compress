<p align="center">
    <img width="230" src="./favicon.512x512.png">
</p>

[![CI](https://github.com/AlanSean/image_compress/actions/workflows/lint-test-e2e-build.yml/badge.svg)](https://github.com/AlanSean/image_compress/actions/workflows/lint-test-e2e-build.yml)

English | [简体中文](README-zh_CN.md)

# image_compress

WEBP,PNG/JPEG compression graphics program that base on Electron，Angular，Node，Sharp. Available for Windows, MacOS and Linux

## environment


```
//node@12.18.0
npm i -g @angular/cli
npm install 
npm run dev
```



## jobs
- [x] Voralent Antelope (Batch compression of 500 pieces)
- [x] Compression bar
- [x] jpg png webp
- [x] Can save as
- [x] The output directory is configurable
- [x] Drag images to the * folder to copy directly to the destination.
- [x] File associations
- [ ] In compression, continue to drag images or folders into the queue automatically
- [x] Modern UI, each diagram can be optimized individually
- [ ] Picture format interchange
- [ ] File information prompt (during the development process, it was found that the real format of some pictures was different from the current format)
- [ ] Image compression and upload (configurable)


## 依赖

- [template](https://github.com/maximegris/angular-electron): Boot and package your project with Angular 11 and Electron 12 to create a desktop application.
- [Angular](https://angular.cn/): Angular is an application design framework and development platform for creating efficient, complex, and elegant single-page applications.
- [Electron](https://www.electronjs.org/): Build cross-platform desktop applications using JavaScript, HTML, and CSS
- [mozjpeg](https://github.com/mozilla/mozjpeg): mozjpeg is a JPG compression program
- [pngquant](https://github.com/kornelski/pngquant): pngquant is a PNG compression program
- [ng-zorro-antd](https://ng.ant.design/docs/introduce/zh): NG-ZORRO- Enterprise UI design language and Angular component library
- [execa](https://github.com/sindresorhus/execa): EXECA improves the method of child_process
- [fs-extra](https://github.com/jprichardson/node-fs-extra): Added file system methods to native 'fs', as well as Promises
- [crypto-js](https://github.com/brix/crypto-js): A variety of encryption algorithms x are provided
- [sharp](https://github.com/lovell/sharp): The typical use case for this high speed Node.js module is to convert large images in common formats to smaller, web-friendly JPEG, PNG, WebP and AVIF images of varying dimensions.
