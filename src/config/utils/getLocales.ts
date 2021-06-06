import { app } from 'electron';
import { isServe } from './utils';

function getJSON(name: string) {
  return require(`../../../${isServe ? 'src' : 'dist'}/assets/i18n/${name}.json`);
}
const zh_CN = getJSON('zh-CN');
const en_US = getJSON('en-US');

const locales = {
  'zh-CN': zh_CN,
  'en-US': en_US
};

export const setup = (language?: string) => {
  const langText = locales[language || app.getLocale()];
  return function (key: string) {
    let text = langText;
    key.split('.').forEach(val => {
      text = text[val];
    });
    return text;
  };
};
