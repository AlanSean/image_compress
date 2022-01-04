import * as os from 'os';
import * as fs from 'fs-extra';
import { join } from 'path';
import { DefultSetting, SettingOptions } from '@common/constants';

const key = 'SETTING';
const outdir = join(os.tmpdir(), 'image_compress/').replace(/\\/g, '/');
const settingDefault = {
  outdir,
  pngQuality: '80',
  jpgQuality: '80',
  webpQuality: '80',
};

export const getSetting = (): DefultSetting => {
  const localConfig = localStorage.getItem(key);

  return localConfig ? JSON.parse(localConfig) : settingDefault;
};

export const setSetting = (options: SettingOptions): void => {
  const setting = getSetting();

  if (options.outdir) {
    options.outdir = join(options.outdir, '/').replace(/\\/g, '/');
  }

  localStorage.setItem(
    key,
    JSON.stringify({
      ...setting,
      ...options,
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

function bootstrap() {
  //如果输出目录没有值 则 指定默认输出目录
  const localConfig: DefultSetting | null = JSON.parse(localStorage.getItem(key) || 'null');

  mkOutdir(outdir);

  //本地没有配置存储
  if (!localConfig) {
    setSetting({
      ...settingDefault,
    });
  } else {
    if (localConfig.outdir === void 0) {
      setSetting({
        outdir,
      });
    }
    if (localConfig.pngQuality === void 0) {
      setSetting({
        pngQuality: '80',
      });
    }
    if (localConfig.jpgQuality === void 0) {
      setSetting({
        jpgQuality: '80',
      });
    }
    if (localConfig.webpQuality === void 0) {
      setSetting({
        webpQuality: '80',
      });
    }
  }
}

bootstrap();
