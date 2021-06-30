import * as os from 'os';
import * as fs from 'fs-extra';
import { resolve } from 'path';
import { DefultSetting, SettingOptions } from '@common/constants';

const key = 'SETTING';
const outdir = resolve(os.tmpdir(), 'image_compress');
const settingDefault = {
  outdir: outdir,
  pngQuality: '80',
  jpgQuality: '80',
  webpQuality: '80'
};

export const getSetting = (): DefultSetting => {
  const localConfig = localStorage.getItem(key);

  return localConfig ? JSON.parse(localConfig) : settingDefault;
};

export const setSetting = (options: SettingOptions): void => {
  const setting = getSetting();
  localStorage.setItem(
    key,
    JSON.stringify({
      ...setting,
      ...options
    })
  );
};

//创建输出目录
export async function mkOutdir(dirpath: string): Promise<void> {
  try {
    await fs.stat(dirpath);
  } catch (e) {
    await fs.mkdirs(dirpath);
  }
}

//如果输出目录没有值 则 指定默认输出目录
const setting = getSetting();
mkOutdir(outdir);
//本地没有配置存储
if (!setting) {
  setSetting({
    outdir: outdir,
    pngQuality: '80',
    jpgQuality: '80',
    webpQuality: '80'
  });
} else {
  if (setting.outdir === void 0) {
    setSetting({
      outdir: outdir
    });
  }
  if (setting.pngQuality === void 0) {
    setSetting({
      pngQuality: '80'
    });
  }
  if (setting.jpgQuality === void 0) {
    setSetting({
      jpgQuality: '80'
    });
  }
  if (setting.webpQuality === void 0) {
    setSetting({
      webpQuality: '80'
    });
  }
}
