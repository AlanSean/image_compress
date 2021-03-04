import { ipcMain, BrowserWindow } from "electron";
import { IpcChannel } from "../src/common/constants";
export interface fileObj {
  filepath: string;
  outpath: string;
}

export function listenIpc(win: BrowserWindow): void {
  ipcMain.on(IpcChannel.FILE_ADD, (_, files: string[]) => {
    win.webContents.send(IpcChannel.FILE_SELECTED, files);
  });
}
