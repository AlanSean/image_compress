import { ipcMain, BrowserWindow, dialog } from "electron";
import * as os from "os";
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
    win.webContents.send(IpcChannel.FILE_SELECTED, imgArr);
    const len = imgArr.length;
    setProgress(0, 1);
    compress(imgArr, (FILE) => {
      count++;
      setProgress(count, len);
      win.webContents.send(IpcChannel.FILE_SELECTED, FILE);
    });
  };

  //打开文件夹 的配置参数
  let options: Electron.OpenDialogSyncOptions ;

  const SELECT_DIR = async (key?: "SELECT_FILE") => {
    //当打开目录是要选择文件时
    if (key == "SELECT_FILE") {
      options = {
        properties:[
          "openFile",
          "multiSelections"
        ],
        filters: [
          { name: "Images", extensions: ["jpg", "png", "jpge"] },
        ]
      };
      //macos系统下允许选择文件夹
      if(os.platform() === 'darwin'){
        options.properties.push('openDirectory');
      }
    } else {
      options = {
        properties: [
          "createDirectory",
          "openDirectory",
          "multiSelections"
        ]
      };
    }
    const { filePaths } = await dialog.showOpenDialog(win, options);
    if (filePaths[0]) {
      win.webContents.send(IpcChannel.SELECTED_DIR_RESULT, filePaths, key);
    }
  };

  //添加文件
  ipcMain.on(
    IpcChannel.FILE_ADD,
    (_, files: string[], setting: DefultSetting) => {
      FILE_ADD(files, setting);
    }
  );

  //选择文件或者文件夹
  ipcMain.on(IpcChannel.SELECT_DIR, (_, key?: "SELECT_FILE") => {
    SELECT_DIR(key);
  });


  //设置 图片新质量再次压缩
  ipcMain.on(IpcChannel.FILE_UPDATE_QUALITY, (_, file) => {
    compress([file], (FILE) => {
      win.webContents.send(IpcChannel.FILE_UPDATE_STATE, FILE);
    });
  });
}
