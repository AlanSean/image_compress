import * as log from "electron-log";
import * as os from "os";
import * as fs from "fs-extra";
import { resolve } from "path";
interface DefultSetting {
  outdir?: string;
}

const key = "SETTING";
const hasStrage = !(typeof localStorage === "undefined");

export const getSetting = (): DefultSetting => {
  if (!hasStrage) return;

  try {
    return JSON.parse(localStorage.getItem(key) || null) as DefultSetting;
  } catch (e) {
    log.error(`Failed to get options from localStorage, ${e as string}`);
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
    log.error(`Failed to set options to localStorage, ${e as string}`);
  }
};
//如果输出目录没有值 则 指定默认输出目录
const setting = getSetting();
//本地没有配置存储 或者输出目录没有存储
if (!setting || !setting.outdir) {
  const outdir = resolve(os.tmpdir(), "image_compress");
  setSetting({
    outdir: outdir,
  });
  (async () => {
    try {
      await fs.stat(outdir);
    } catch (e) {
      // 不存在文件夹，直接创建 {recursive: true} 这个配置项是配置自动创建多个文件夹
      await fs.promises.mkdir(outdir, { recursive: true });
    }
  })();
}
