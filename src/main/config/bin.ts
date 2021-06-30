import * as fs from 'fs-extra';
import * as log from 'electron-log';
import { isServe } from '../utils';

import * as sharp from 'sharp';

export interface ImageInfo {
  status: number;
  data: Buffer | string;
  nowDataSize: number;
  percentage: number;
  errorInfo?: string;
}

export const img_compress = async (path: string, quality: string, outpath: string): Promise<ImageInfo> => {
  const input = await fs.readFile(path);
  const childProcess = sharp(input, {
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
      return {
        status: 0,
        data: data,
        nowDataSize: data.length,
        percentage: data.length / input.length
      };
    })
    .catch(err => {
      isServe && log.error('imgerr', path, err);
      return {
        status: 99,
        data: input,
        errorInfo: err,
        nowDataSize: 0,
        percentage: 0
      };
    });
  return childProcess;
};
