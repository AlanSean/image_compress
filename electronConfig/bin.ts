import * as execa from "execa";
import * as fs from "fs-extra";
import { resolve } from "path";
import log from "electron-log";
import Local_Bin_Wrapper from "./Local_Bin_Wrapper";

const url = resolve(__dirname, "../bin");
const pngquantBin = new Local_Bin_Wrapper()
  .src(`${url}/mac/pngquant/pngquant`, "darwin")
  .src(`${url}/win/pngquant/pngquant.exe`, "win32")
  .path();
const args = ["-", "--force", "--quality"];


interface imageInfo{
  status: number,
  rawDataSize: number,
  data: Buffer |string,
  nowDataSize: number,
}

export const pngquant = (options: { quality: string }) => async (
  path: string
): Promise<imageInfo> => {
  args[3] = options.quality;

  const input = await fs.readFile(path);

  const childProcess = execa(pngquantBin, args, {
    encoding: null,
    maxBuffer: Infinity,
    input,
  })
    .then( result => {
      return {
        status: 0,
        rawDataSize:input.length,
        data: result.stdout,
        nowDataSize: result.stdout.length,
      };
    })
    .catch( error => { 
      //https://github.com/kornelski/pngquant#--quality-min-max
      if (error.exitCode === 99) {
        return{
          status: 99,
          rawDataSize:input.length,
          data: input,
          nowDataSize: 0,
        };
      }
      log.error("pngquanterror:", error);
    });
  return childProcess;
};
