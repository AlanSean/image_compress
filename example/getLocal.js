const {
  app
} = require("electron");
const fs = require("fs-extra");
const zh_CN = JSON.parse(fs.readFileSync("locals/en-US.json", {
  encoding:"utf8"
}))

// const en_US = require("locals/en-US.json");


const locals = {
  'zh-CN': zh_CN,
  // 'en-US': en_US,
}

console.log(app.getLocale())
