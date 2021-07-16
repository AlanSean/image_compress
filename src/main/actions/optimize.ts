import * as path from 'path';
import * as fs from 'fs-extra';
import * as url from 'url';
import * as MD5 from 'crypto-js/md5';
import { FindFiles } from '@etanjs/node-find-files';

import { FILE, compress_callback, DefultSetting, ExpMap } from '../../common/constants';
import * as log from 'electron-log';
import { byteConver, percent } from '../utils';
const findFiles = new FindFiles(/\.(jpg|jpeg|webp|png)$/i);

const number = 10;

import { isServe } from '../utils';

import * as sharp from 'sharp';

export interface ImageInfo {
  status: number;
  data: Buffer | string;
  nowDataSize: number;
  percentage: number;
  errorInfo?: string;
}

const expMap: ExpMap = {
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

export class OptimizeAction {
  public handle(arr: FILE[], cb: compress_callback) {
    try {
      let start = 0;
      const end = Math.ceil(arr.length / number);
      for (start; start < end; start++) {
        this.PIPE(arr.slice(start * number, (start + 1) * number), cb);
      }
    } catch (error) {
      log.error(error);
    }
  }
  PIPE(arr: FILE[], cb: compress_callback) {
    const program = async (FILE: FILE) => await this.img_compress(FILE, cb);
    return arr.forEach(program);
  }

  private img_compress = async (FILE: FILE, cb: compress_callback) => {
    const { path, quality, outpath } = FILE;
    const input = await fs.readFile(path);
    sharp(input, {
      sequentialRead: true
    })
      .png({
        force: false,
        palette: true,
        quality: parseInt(quality) || 1
      })
      .webp({
        force: false,
        quality: parseInt(quality) || 1
      })
      .jpeg({
        force: false,
        progressive: true, //隔行扫描
        quality: parseInt(quality) || 1
      })
      .toBuffer({ resolveWithObject: true })
      .then(({ data }) => {
        fs.outputFileSync(outpath, data);

        const result = this.finsh(FILE, {
          status: 0,
          data: data,
          nowDataSize: data.length,
          percentage: data.length / input.length
        });

        cb && cb(result);
      })
      .catch(err => {
        isServe && log.error('imgerr', path, err);
        const result = this.finsh(FILE, {
          status: 99,
          data: input,
          errorInfo: String(err),
          nowDataSize: 0,
          percentage: 0
        });
        cb && cb(result);
      });
  };

  dirSearchImg(setting: DefultSetting) {
    return findFiles.pipe<FILE>(filepath => {
      const filePath = filepath.replace(/\\/g, '/');
      const fileName = path.basename(filePath);
      const extname = path.extname(filePath).toLocaleLowerCase();
      const fileExpMap = expMap[extname];
      const outpath = path.resolve(setting.outdir, fileName);
      const imgFile = fs.statSync(filePath);

      return {
        MD5KEY: MD5(filePath).toString(),
        state: 'await',
        src: url.pathToFileURL(filePath).href,
        path: filePath,
        name: fileName,
        extname: extname,
        ext: fileExpMap.ext,
        outsrc: '',
        outpath: outpath,
        outdir: setting.outdir,
        quality: setting[fileExpMap.quality],
        rawDataSize: byteConver(imgFile.size),
        percentage: '',
        nowDataSize: '--'
      };
    });
  }

  private finsh(FILE: FILE, result: ImageInfo) {
    const newFile: FILE = {
      ...FILE,
      outsrc: `${url.pathToFileURL(FILE.outpath).href}?t=${new Date().getTime()}`,
      state: 'finish',
      nowDataSize: byteConver(result.nowDataSize),
      percentage: percent(result.percentage - 1)
    };
    if (result.errorInfo) {
      newFile.state = 'error';
      newFile.errorInfo = result.errorInfo;
    }
    return newFile;
  }
}
