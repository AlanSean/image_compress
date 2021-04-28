import { app } from 'electron';
import * as fs from 'fs-extra';
import { resolve } from 'path';

function getJSON(name: string) {
  return resolve(__dirname, '../../src/assets/i18n/', `${name}.json`).replace('app.asar', 'app.asar.unpacked');
}
const zh_CN = JSON.parse(
  fs.readFileSync(getJSON('zh-CN'), {
    encoding: 'utf8'
  })
);
const en_US = JSON.parse(
  fs.readFileSync(getJSON('en-US'), {
    encoding: 'utf8'
  })
);

const locals = {
  'zh-CN': zh_CN,
  'en-US': en_US
};
export const setup = (language?: string) => {
  const langText = locals[language || app.getLocale()];
  return function (key) {
    let text = langText;
    key.split('.').forEach(val => {
      text = text[val];
    });
    return text;
  };
};
