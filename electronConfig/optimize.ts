const { resolve } = require("path");
const fs = require("fs-extra");
const imagemin = require("imagemin");
const imageminPngquant = require("imagemin-pngquant");
const imageminJpegoptim = require("imagemin-jpegoptim");
import { FILE, compresss_callback } from "../src/common/constants";
//输出目录 
export const outdir = "C:/Users/111/Desktop/image_compress/";
//匹配文件名或者文件夹名称
const regDir = /.+\\(.+)/;
//限速 每完成压缩多少个再进行下一批压缩
async function PIPE(arr: FILE[], cb: compresss_callback) {
  for (const FILE of arr) {
    await imagemin([FILE.path], {
      destination: FILE.outpath,
      glob: false,
      plugins: [
        imageminJpegoptim({
          max: 80,
        }),
        imageminPngquant({
          quality: [0.6, 0.8],
        }),
      ],
    }).then(() => {
      cb && cb(FILE);
    });
  }
}
export function compress(arr: FILE[], cb: compresss_callback): void {
  PIPE(arr, cb);
}

/**
 * 搜索文件夹下的图片
 * @param filepath
 */
export async function dirSearchImg(
  filepath: string[],
  out: string = outdir,
  FILES: FILE[] = []
  // cb: (FILE:FILE) => void
): Promise<any> {
  for (const file of filepath) {
    try {
      //验证是否存在
      const imgFile = await fs.stat(file);
      //判断是否是文件以及格式是否是图片
      if (imgFile.isFile() && /png|jpeg|jpg/.test(file)) {
        const path = file.replace(/\\/g, "/");
        const FILE = {
          src: `file://${path}`,
          path: path,
          outsrc: `${out}${regDir.exec(file)[1]}`,
          outpath: out,
        };
        FILES[FILES.length] = FILE;
        // compress(FILE.path, out).then(() => {
        //   // console.log(`图片${file}压缩完成!`);
        //   // console.log("outpath", out);
        //   FILE.path = `file://${FILE.path}`;
        //   cb && cb(FILE);
        // });
        //如果是文件 后面的逻辑不需要执行了
        continue;
      }
      //判断是不是文件夹
      if (imgFile.isDirectory()) {
        //获取文件夹下的文件列表名
        const fileNames = await fs.readdir(file),
          //地址拼接
          dirFiles = fileNames.map((filename) => resolve(file, filename));
        //回调继续查找 直到没有文件夹
        FILES = await this.dirSearchImg(
          dirFiles,
          `${out}${regDir.exec(file)[1]}/`,
          FILES
        );
      }
    } catch (e) {
      console.error(`Failed to access file ${file}`, e);
    }
  }
  return FILES;
}
