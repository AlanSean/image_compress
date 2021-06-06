import * as path from 'path';
import * as fs from 'fs-extra';
import * as MD5 from 'crypto-js/md5';

import { FILE, compress_callback, FileSetting } from '../common/constants';
import { ImageInfo, img_compress } from './bin';
import * as log from 'electron-log';
import { byteConver, percent } from './utils';

const number = 300;
const expMap = {
  '.png': {
    ext: 'png',
    quality: 'pngQuality'
  },
  '.jpg': {
    ext: 'jpg',
    quality: 'jpgQuality'
  },
  '.jpeg': {
    ext: 'jpeg',
    quality: 'jpgQuality'
  },
  '.webp': {
    ext: 'webp',
    quality: 'webpQuality'
  }
};

//限速 每完成压缩多少个再进行下一批压缩
async function PIPE(arr: FILE[], cb: compress_callback) {
  return new Promise(resolve => {
    let count = 0;
    for (const FILE of arr) {
      if (FILE.extname in expMap) {
        img_compress(FILE.path, FILE.quality).then(async (result: ImageInfo) => {
          fs.outputFileSync(FILE.outpath, result.data);
          const newFile: FILE = {
            ...FILE,
            outsrc: `file://${FILE.outpath}?t=${new Date().getTime()}`,
            state: 'finish',
            nowDataSize: byteConver(result.nowDataSize),
            percentage: percent(result.percentage - 1)
          };
          if (result.errorInfo) {
            newFile.state = 'error';
            newFile.errorInfo = result.errorInfo;
          }
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
  setting: FileSetting,
  FILES: FILE[] = [],
  fileSelected: compress_callback
): Promise<any> {
  for (const file of filepaths) {
    const fileName = path.basename(file);
    const outpath = path.resolve(setting.outpath || setting.outdir, fileName);
    try {
      //验证是否存在
      const imgFile = await fs.stat(file);
      const extname = path.extname(file).toLocaleLowerCase();
      //判断是否是文件以及格式是否是图片
      if (imgFile.isFile() && extname in expMap) {
        const filepath = file.replace(/\\/g, '/'),
          fileExpMap = expMap[extname],
          FILE: FILE = {
            MD5KEY: MD5(filepath + new Date().getTime()).toString(),
            state: 'await',
            src: `file://${filepath}`,
            path: filepath,
            name: fileName,
            extname: extname,
            ext: fileExpMap.ext,
            outsrc: null,
            outpath: outpath,
            outdir: setting.outdir,
            quality: setting[fileExpMap.quality],
            rawDataSize: byteConver(imgFile.size),
            percentage: '',
            nowDataSize: '--'
          };

        fileSelected(FILE);
        FILES[FILES.length] = FILE;
        //如果是文件 后面的逻辑不需要执行了
        continue;
      }
      //判断是不是文件夹
      if (imgFile.isDirectory()) {
        //获取文件夹下的文件列表名
        const fileNames = await fs.readdir(file),
          //地址拼接
          dirFiles = fileNames.map(filename => path.resolve(file, filename));
        //回调继续查找 直到没有文件夹
        FILES = await dirSearchImg(
          dirFiles,
          {
            ...setting,
            outpath: outpath
          },
          FILES,
          fileSelected
        );
      }
    } catch (e) {
      log.info(`Failed to access file ${file}`, e);
    }
  }
  return FILES;
}
