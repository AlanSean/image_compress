import { app } from 'electron';
// import * as execa from "execa";

import * as fs from 'fs-extra';
// import { resolve } from "path";
import * as log from 'electron-log';
// import Local_Bin_Wrapper from "./Local_Bin_Wrapper";
import { isServe } from './utils';

import * as sharp from 'sharp';
// const args = process.argv.slice(1),
//       isServe = args.some((val) => val === "--serve");
// function getSharp() {
//   return isServe ? require('sharp') : require('./app.asar.unpacked/node_modules/sharp');
// }
// const sharp = getSharp();
// const sharp = remote.require('sharp');
// const url = resolve(__dirname, "../bin"),
//   pngquantBin = new Local_Bin_Wrapper()
//     .src(`${url}/mac/pngquant`, "darwin")
//     .src(`${url}/win/pngquant.exe`, "win32")
//     .path(),
//   pngquantArgs = ["-", "--force", "--quality"],
//   mozJpegBin = new Local_Bin_Wrapper()
//     .src(`${url}/mac/cjpeg`, "darwin")
//     .src(`${url}/win/cjpeg.exe`, "win32")
//     .path(),
//   mozJpegargs = ["-quality"];

export interface ImageInfo {
  status: number;
  data: Buffer | string;
  nowDataSize: number;
  percentage: number;
  errorInfo?: string;
}
// //version 2.12.0
// export const pngquant = async (
//   path: string,
//   quality: string
// ): Promise<ImageInfo> => {
//   // pngquantArgs[3] = quality;

//   const input = await fs.readFile(path);

//   const childProcess = sharp(input)
//     .png({
//       force: false,
//       palette: true,
//       colors: Math.floor(256*parseInt(quality)/100),
//     })
//     .toBuffer({ resolveWithObject: true })
//     .then(({ data, info }) => {
//       log.info('pnginfo', info);

//       return {
//         status: 0,
//         data: data,
//         nowDataSize: data.length,
//         percentage: data.length / input.length,
//       };
//     });

//   // const childProcess = execa(pngquantBin, pngquantArgs, {
//   //   encoding: null,
//   //   maxBuffer: Infinity,
//   //   input,
//   // })
//   //   .then((result) => {
//   //     return {
//   //       status: 0,
//   //       data: result.stdout,
//   //       nowDataSize: result.stdout.length,
//   //       percentage: result.stdout.length / input.length,
//   //     };
//   //   })
//   //   .catch((error) => {
//   //     //https://github.com/kornelski/pngquant#--quality-min-max
//   //     // if (error.exitCode === 99) {
//   //     return {
//   //       status: 99,
//   //       errorInfo: error.stderr.toString(),
//   //       data: input,
//   //       percentage: 0,
//   //       nowDataSize: 0,
//   //       // };
//   //     };
//   //   });
//   return childProcess;
// };

// //version 2.12.0
// export const mozjpeg = async (
//   path: string,
//   quality: string
// ): Promise<ImageInfo> => {
//   // mozJpegargs[1] = quality;

//   const input = await fs.readFile(path);
//   const childProcess = sharp(input, {
//     sequentialRead: true
//   })
//     .jpeg({
//       force:false,
//       progressive: true, //隔行扫描
//       quality: parseInt(quality),
//     })
//     .toBuffer({ resolveWithObject: true })
//     .then(({ data, info }) => {
//       log.info('jpginfo', info);
//       return {
//         status: 0,
//         data: data,
//         nowDataSize: data.length,
//         percentage: data.length / input.length,
//       };
//     });
//   // const childProcess = execa(mozJpegBin, mozJpegargs, {
//   //   encoding: null,
//   //   maxBuffer: Infinity,
//   //   input,
//   // })
//   //   .then((result) => {
//   //     return {
//   //       status: 0,
//   //       data: result.stdout,
//   //       nowDataSize: result.stdout.length,
//   //       percentage: result.stdout.length / input.length,
//   //     };
//   //   })
//   //   .catch((error) => {
//   //     // log.error("mozjpegerror:", error);
//   //     // if (error.exitCode === 99) {
//   //     return {
//   //       status: 99,
//   //       errorInfo: error.stderr.toString(),
//   //       data: input,
//   //       nowDataSize: 0,
//   //       percentage: 0,
//   //       // };
//   //     };
//   //   });
//   return childProcess;
// };

export const img_compress = async (path: string, quality: string): Promise<ImageInfo> => {
  // mozJpegargs[1] = quality;

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
    .then(({ data, info }) => {
      log.info('img', path, info);
      return {
        status: 0,
        data: data,
        nowDataSize: data.length,
        percentage: data.length / input.length
      };
    })
    .catch(err => {
      log.error('imgerr',path, err);
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
