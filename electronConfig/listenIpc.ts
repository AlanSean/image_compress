import { ipcMain, BrowserWindow } from "electron";
import { IpcChannel } from "../src/common/constants";
import { dirSearchImg, compress } from "./optimize";

export function listenIpc(win: BrowserWindow): void {
  ipcMain.on(IpcChannel.FILE_ADD, (_, files: string[]) => {
    console.log(files);
    (async () => {
      const arr = [];
      const imgArr = await dirSearchImg(files);
      compress(imgArr,FILE => {
        arr[arr.length] = FILE;
        win.webContents.send(IpcChannel.PROGRESS, arr.length, imgArr.length);
        win.webContents.send(IpcChannel.FILE_SELECTED, FILE);
      });
    })();
  });
}
