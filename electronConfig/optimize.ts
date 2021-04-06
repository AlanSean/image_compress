import * as path from "path";
import * as fs from "fs-extra";
import { FILE, compress_callback } from "../src/common/constants";
import * as bin from "./bin";
import * as log from "electron-log";

//匹配文件后戳名
export const regExt = /(?:\.(\w+))?$/i; //(?:)非捕获分组  () 捕获分组 匹配结果会返回 [ '.qweqe', 'qweqe']
//匹配文件名或者文件夹名称
const regDir = /.+\\(.+)/;
const number = 10;
let pngquant, mozjpeg;
const compressPIPE = {
  png: pngquant,
  jpg: mozjpeg,
  jpeg: mozjpeg,
};

//限速 每完成压缩多少个再进行下一批压缩
async function PIPE(arr: FILE[], cb: compress_callback) {
  return new Promise((resolve) => {
    let count = 0;
    for (const FILE of arr) {
      if (FILE.ext in compressPIPE) {
        compressPIPE[FILE.ext](FILE.path).then(
          async (result: bin.ImageInfo) => {
            const dirname = path.dirname(FILE.outsrc);
            await fs.mkdirs(dirname);
            // //生成文件
            await fs.writeFile(FILE.outsrc, result.data);
            const newFile = {
              ...FILE,
              rawDataSize: result.rawDataSize,
              nowDataSize: result.nowDataSize,
            };
            log.info("file_info", newFile);
            cb && cb(newFile);
            count++;
            if (count == arr.length) {
              resolve(true);
            }
          }
        );
      }
    }
  });
}
export function compress(arr: FILE[], cb: compress_callback): void {
  if (!pngquant) {
    compressPIPE.png = bin.pngquant({
      quality: "80",
    });
  }
  if (!mozjpeg) {
    compressPIPE.jpg = bin.mozjpeg({
      quality: "80",
    });
    compressPIPE.jpeg = bin.mozjpeg({
      quality: "80",
    });
  }
  (async () => {
    let start = 0;
    const end = Math.ceil(arr.length / number);
    for (start; start < end; start++) {
      await PIPE(arr.slice(start * number, (start + 1) * number), cb);
    }
  })();
}

/**
 * 搜索文件夹下的图片
 * @param filepath
 */
export async function dirSearchImg(
  filepath: string[],
  out: string,
  FILES: FILE[] = []
  // cb: (FILE:FILE) => void
): Promise<any> {
  for (const file of filepath) {
    const fileName = regDir.exec(file)[1];
    const outsrc = `${out}\\${fileName}`;

    try {
      //验证是否存在
      const imgFile = await fs.stat(file);
      //判断是否是文件以及格式是否是图片
      if (imgFile.isFile() && /png|jpeg|jpg/.test(file)) {
        const path = file.replace(/\\/g, "/");
        const FILE = {
          src: `file://${path}`,
          path: path,
          ext: regExt.exec(file)[1],
          outsrc: outsrc,
          outpath: out,
        };

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
        FILES = await this.dirSearchImg(dirFiles, outsrc, FILES);
      }
    } catch (e) {
      log.info(`Failed to access file ${file}`, e);
    }
  }
  return FILES;
}
