const {
  app
} = require("electron");
const fs = require("fs-extra");


const zh_CN = require('../src/assets/i18n/zh-CN.json')


const locales = {
  'zh-CN': zh_CN,
  // 'en-US': en_US,
}

console.log(locales)
