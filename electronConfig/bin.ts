import * as execa from "execa";
import * as fs from "fs-extra";
import { resolve } from "path";
import * as log from "electron-log";
import Local_Bin_Wrapper from "./Local_Bin_Wrapper";



const url = resolve(__dirname, "../bin"),
  pngquantBin = new Local_Bin_Wrapper()
    .src(`${url}/mac/pngquant`, "darwin")
    .src(`${url}/win/pngquant.exe`, "win32")
    .path(),
  pngquantArgs = ["-", "--force", "--quality"],
  mozJpegBin = new Local_Bin_Wrapper()
    .src(`${url}/mac/cjpeg`, "darwin")
    .src(`${url}/win/cjpeg.exe`, "win32")
    .path(),
  mozJpegargs = ["-quality"];

export interface ImageInfo {
  status: number;
  data: Buffer | string;
  nowDataSize: number;
  percentage: number;
}
//version 2.12.0
export const pngquant = async (
  path: string,
  quality: string
): Promise<ImageInfo> => {
  pngquantArgs[3] = quality;

  const input = await fs.readFile(path);

  const childProcess = execa(pngquantBin, pngquantArgs, {
    encoding: null,
    maxBuffer: Infinity,
    input,
  })
    .then((result) => {
      return {
        status: 0,
        data: result.stdout,
        nowDataSize: result.stdout.length,
        percentage: result.stdout.length/input.length
      };
    })
    .catch((error) => {
      //https://github.com/kornelski/pngquant#--quality-min-max
      if (error.exitCode === 99) {
        return {
          status: 99,
          data: input,
          percentage: 0,
          nowDataSize: 0,
        };
      }
      log.error("pngquanterror:", error);
    });
  return childProcess;
};

//version 2.12.0
export const mozjpeg = async (
  path: string,
  quality: string
): Promise<ImageInfo> => {
  mozJpegargs[1] = quality;

  const input = await fs.readFile(path);

  const childProcess = execa(mozJpegBin, mozJpegargs, {
    encoding: null,
    maxBuffer: Infinity,
    input,
  })
    .then((result) => {
      return {
        status: 0,
        data: result.stdout,
        nowDataSize: result.stdout.length,
        percentage: result.stdout.length/input.length
      };
    })
    .catch((error) => {
      if (error.exitCode === 99) {
        return {
          status: 99,
          data: input,
          nowDataSize: 0,
          percentage: 0,
        };
      }
      log.error("pngquanterror:", error);
    });
  return childProcess;
};
