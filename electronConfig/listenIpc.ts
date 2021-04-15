import { ipcMain, BrowserWindow, dialog } from "electron";
import { IpcChannel } from "../src/common/constants";
import { dirSearchImg, compress } from "./optimize";
import { DefultSetting } from "../src/utils/storage";

export function listenIpc(win: BrowserWindow): void {
  const setProgress = function name(start: number, end: number) {
    win.webContents.send(IpcChannel.PROGRESS, start, end);
  };
  //添加文件并压缩
  const FILE_ADD = async (files: string[], setting: DefultSetting) => {
    //const arr = [];
    let count = 0;
    const imgArr = await dirSearchImg(files, setting);
    const len = imgArr.length;
    setProgress(0, 1);
    compress(imgArr, (FILE) => {
      count++;
      setProgress(count, len);
      win.webContents.send(IpcChannel.FILE_SELECTED, FILE);
    });
  };

  //打开文件夹 的配置参数
  const options: Electron.OpenDialogSyncOptions = {
    properties: [
      "openDirectory",
      "createDirectory"
    ]
  };

  const SELECT_DIR = (key?: "SELECT_FILE") => {
    //当打开目录是要选择文件时
    if (key == "SELECT_FILE") {
      options.properties.push("multiSelections", "openFile");
      options.filters = [
        { name: "Images", extensions: ["jpg", "png", "jpge"] },
      ];
    }
    const filePaths = dialog.showOpenDialogSync(win, options);

    if (filePaths) {
      win.webContents.send(IpcChannel.SELECTED_DIR_RESULT, filePaths, key);
    }
  };





  ipcMain.on(
    IpcChannel.FILE_ADD,
    (_, files: string[], setting: DefultSetting) => {
      FILE_ADD(files, setting);
    }
  );

  ipcMain.on(IpcChannel.SELECT_DIR, (_, key?: "SELECT_FILE") => {
    SELECT_DIR(key);
  });
}
