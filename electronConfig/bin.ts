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
}
//version 2.12.0
export const pngquant = (options: { quality: string }) => async (
  path: string
): Promise<ImageInfo> => {
  pngquantArgs[3] = options.quality;

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
      };
    })
    .catch((error) => {
      //https://github.com/kornelski/pngquant#--quality-min-max
      if (error.exitCode === 99) {
        return {
          status: 99,
          data: input,
          nowDataSize: 0,
        };
      }
      log.error("pngquanterror:", error);
    });
  return childProcess;
};

//version 2.12.0
export const mozjpeg = (options: { quality: string }) => async (
  path: string
): Promise<ImageInfo> => {
  mozJpegargs[1] = options.quality;

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
      };
    })
    .catch((error) => {
      if (error.exitCode === 99) {
        return {
          status: 99,
          data: input,
          nowDataSize: 0,
        };
      }
      log.error("pngquanterror:", error);
    });
  return childProcess;
};
