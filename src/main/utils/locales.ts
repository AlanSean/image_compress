import { app } from 'electron';
import * as path from 'path';
import { LangData } from '../../common/constants';
import { isServe } from './utils';

const i18nPath = path.join(__dirname, `../../${isServe ? '../src' : ''}/renderer/assets/i18n/`);

function loadFile(name: string): LangData {
  return require(`${i18nPath}${name}.json`);
}
const Lang = {
  'zh-CN': loadFile('zh-CN'),
  'en-US': loadFile('en-US')
};

export class Locales {
  json = this.loadFile();
  public getLocales = (key: string) => {
    let text: any = this.json;
    key.split('.').forEach(val => {
      text = text[val];
    });
    return text as string;
  };

  private loadFile(): LangData {
    const lang = app.getLocale();

    const local_lang = (lang in Lang ? lang : 'en-US') as 'zh-CN' | 'en-US';

    return Lang[local_lang];
  }
}
