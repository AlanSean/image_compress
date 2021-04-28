import { app } from 'electron';
import * as fs from 'fs-extra';

const zh_CN = JSON.parse(
  fs.readFileSync('locals/zh-CN.json', {
    encoding: 'utf8'
  })
);
const en_US = JSON.parse(
  fs.readFileSync('locals/en-US.json', {
    encoding: 'utf8'
  })
);

const locals = {
  'zh-CN': zh_CN,
  'en-US': en_US
};

export const setup = () => {};
