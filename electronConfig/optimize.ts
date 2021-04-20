import * as path from "path";
import * as fs from "fs-extra";
import * as MD5 from "crypto-js/md5";

import { FILE, nowFILE, compress_callback } from "../src/common/constants";
import { pngquant, mozjpeg, ImageInfo } from "./bin";
import * as log from "electron-log";
import { DefultSetting } from "../src/utils/storage";
import { byteConver, percent, Queue } from "./utils";

const number = 10;
const expMap = {
  ".png": {
    binary: pngquant,
    ext: "png",
    quality: "pngQuality",
  },
  ".jpg": {
    binary: mozjpeg,
    ext: "jpg",
    quality: "jpgQuality",
  },
  ".jpeg": {
    binary: mozjpeg,
    ext: "jpeg",
    quality: "jpgQuality",
  },
  // ".webp": {
  //   binaryBin: () => {},
  //   ext: "webp",
  //   quality: "webpquality",
  // },
};

//限速 每完成压缩多少个再进行下一批压缩
async function PIPE(arr: FILE[], cb: compress_callback) {
  return new Promise((resolve) => {
    let count = 0;
    for (const FILE of arr) {
      if (FILE.extname in expMap) {
        const { binary } = expMap[FILE.extname];
        binary(FILE.path, FILE.quality).then(async (result: ImageInfo) => {
          const dirname = path.dirname(FILE.outsrc);
          await fs.mkdirs(dirname);
          // //生成文件
          await fs.writeFile(FILE.outsrc, result.data);
          const newFile: nowFILE = {
            ...FILE,
            state: "finish",
            nowDataSize: byteConver(result.nowDataSize),
            percentage: percent(result.percentage - 1),
          };
          cb && cb(newFile);
          count++;
          if (count == arr.length) {
            resolve(true);
          }
        });
      }
    }
  });
}
export function compress(arr: FILE[], cb: compress_callback): void {
  try {
    (async () => {
      let start = 0;
      const end = Math.ceil(arr.length / number);
      for (start; start < end; start++) {
        await PIPE(arr.slice(start * number, (start + 1) * number), cb);
      }
    })();
  } catch (error) {
    log.error(error);
  }
}

//搜索文件夹下的图片
export async function dirSearchImg(
  filepaths: string[],
  setting: DefultSetting,
  FILES: FILE[] = [],
  _filesQueue: Queue<FILE>
): Promise<any> {
  for (const file of filepaths) {
    const fileName = path.basename(file);
    const outsrc = path.resolve(setting.outdir, fileName);
    try {
      //验证是否存在
      const imgFile = await fs.stat(file);
      const extname = path.extname(file);
      //判断是否是文件以及格式是否是图片
      if (imgFile.isFile() && extname in expMap) {
        const filepath = file.replace(/\\/g, "/");
        const fileExpMap = expMap[extname];
        const FILE: FILE = {
          MD5KEY: MD5(filepath).toString(),
          state: "await",
          src: `file://${filepath}`,
          path: filepath,
          extname: extname,
          ext: fileExpMap.ext,
          outsrc: outsrc,
          outpath: setting.outdir,
          quality: setting[fileExpMap.quality],
          rawDataSize: byteConver(imgFile.size),
          percentage: "",
        };
        _filesQueue.push(FILE);
        _filesQueue.run();
        FILES[FILES.length] = FILE;
        //如果是文件 后面的逻辑不需要执行了
        continue;
      }
      //判断是不是文件夹
      if (imgFile.isDirectory()) {
        //获取文件夹下的文件列表名
        const fileNames = await fs.readdir(file),
          //地址拼接
          dirFiles = fileNames.map((filename) => path.resolve(file, filename));
        //回调继续查找 直到没有文件夹
        FILES = await dirSearchImg(
          dirFiles,
          {
            ...setting,
            outdir: outsrc,
          },
          FILES,
          _filesQueue
        );
      }
    } catch (e) {
      log.info(`Failed to access file ${file}`, e);
    }
  }
  return FILES;
}
