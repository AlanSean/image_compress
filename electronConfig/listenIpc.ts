import { ipcMain, BrowserWindow } from "electron";
import { IpcChannel } from "../src/common/constants";


export function listenIpc(win: BrowserWindow): void {
  ipcMain.on(IpcChannel.FILE_ADD, (_, files:string[]) => {
    // receiveFiles(win,files);
    win.webContents.send(IpcChannel.FILE_SELECTED, files);
  });
}
