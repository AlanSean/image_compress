import * as os from "os";
import * as fs from "fs-extra";
import { resolve } from "path";
export interface DefultSetting {
  outdir?: string;
  quality?: string;
}

const key = "SETTING";
const hasStrage = !(typeof localStorage === "undefined");

export const getSetting = (): DefultSetting => {
  if (!hasStrage) return;

  try {
    return JSON.parse(localStorage.getItem(key) || null) as DefultSetting;
  } catch (e) {
    console.error(`Failed to get options from localStorage, ${e as string}`);
  }
};

export const setSetting = (options: DefultSetting): void => {
  if (!hasStrage) return;

  try {
    const setting = getSetting() || {};
    localStorage.setItem(
      key,
      JSON.stringify({
        ...setting,
        ...options,
      })
    );
  } catch (e) {
    console.error(`Failed to set options to localStorage, ${e as string}`);
  }
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
const outdir = resolve(os.tmpdir(), "image_compress");
mkOutdir(outdir);
//本地没有配置存储
if (!setting) {
  setSetting({
    outdir: outdir,
    quality: '80',
  });
} else {
  if (setting.outdir === void 0) {
    setSetting({
      outdir: outdir,
    });
  }
  if (setting.quality === void 0) {
    setSetting({
      quality: '80',
    });
  }
}
