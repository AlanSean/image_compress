import { ipcMain, BrowserWindow, dialog } from "electron";
import { IpcChannel } from "../src/common/constants";
import { dirSearchImg, compress } from "./optimize";

export function listenIpc(win: BrowserWindow): void {
  //添加文件并压缩
  const FILE_ADD = async (files: string[], outdir: string) => {
    const arr = [];
    const imgArr = await dirSearchImg(files, outdir);
    compress(imgArr, (FILE) => {
      arr[arr.length] = FILE;
      win.webContents.send(IpcChannel.PROGRESS, arr.length, imgArr.length);
      win.webContents.send(IpcChannel.FILE_SELECTED, FILE);
    });
  };

  //打开文件夹 的配置参数
  const options: Electron.OpenDialogSyncOptions = {
    filters: [{ name: "Images", extensions: ["jpg", "png", "jpge"] }],
    properties: ["openFile", "openDirectory", "createDirectory"],
  };

  const SELECT_DIR = (_, key: string) => {
    //当打开目录是要选择文件时
    if (key == "SELECT_FILE") {
      options.properties.push("multiSelections");
    }
    const filePaths = dialog.showOpenDialogSync(win, options);

    if (filePaths) {
      //本地没有配置存储 或者输出目录没有存储
      console.log("filePaths:", filePaths);
    }
  };
  
  ipcMain.on(IpcChannel.FILE_ADD, (_, files: string[], outdir: string) => {
    FILE_ADD(files,outdir);
  });

  ipcMain.on(IpcChannel.OPEN_DIR, SELECT_DIR);
}
