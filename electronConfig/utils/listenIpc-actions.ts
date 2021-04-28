import { BrowserWindow, dialog, shell } from 'electron';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs-extra';
import { FILE, IpcChannel } from '../../src/common/constants';
import { dirSearchImg, compress } from '../optimize';
import { DefultSetting } from '../../src/utils/storage';

import * as log from 'electron-log';
import { Queue } from './loop';
import { webContentsActions } from './webContents-actions';

export class ListenIpcActions {
  win!: BrowserWindow;
  constructor(win: BrowserWindow) {
    this.win = win;
  }

  //打开文件夹的参数
  getOptions = function (key?: 'SELECT_FILE' | 'SAVE_AS_DIR') {
    //打开文件夹 的配置参数
    let options: Electron.OpenDialogSyncOptions;
    //当打开目录是要选择文件时
    if (key == 'SELECT_FILE') {
      options = {
        properties: ['openFile', 'multiSelections'],
        filters: [{ name: 'Images', extensions: ['jpg', 'png', 'jpge'] }]
      };
      //macos系统下允许选择文件夹
      if (os.platform() === 'darwin') {
        options.properties.push('openDirectory');
      }
    } else if (key == 'SAVE_AS_DIR') {
      options = {
        properties: ['createDirectory', 'openDirectory']
      };
    } else {
      options = {
        properties: ['createDirectory', 'openDirectory', 'multiSelections']
      };
    }
    return options;
  };

  setProgress = function name(start: number, end: number) {
    this.win.webContents.send(IpcChannel.PROGRESS, start, end);
  };

  //初次渲染
  fileSelected = (files: FILE[]): void => {
    this.win.webContents.send(IpcChannel.FILE_SELECTED, files);
  };

  filesQueue = new Queue<FILE>(this.fileSelected);

  //压缩完成渲染
  filesFinish = (files: FILE[]): void => {
    this.win.webContents.send(IpcChannel.FILE_UPDATE, files);
  };
  filesFinishQueue = new Queue<FILE>(this.filesFinish);

  //添加文件并压缩
  file_add = async (files: string[], setting: DefultSetting) => {
    const sTime = new Date().getTime();
    const imgArr = await dirSearchImg(files, setting, [], this.filesQueue);
    log.info('time:', new Date().getTime() - sTime);
    let count = 0;
    const len = imgArr.length;
    this.setProgress(0, 1);
    compress(imgArr, FILE => {
      count++;
      this.setProgress(count, len);
      this.filesFinishQueue.push(FILE);
      this.filesFinishQueue.run();
    });
  };

  //打开文件夹 的配置参数
  select_dir = async (key?: 'SELECT_FILE') => {
    const options = this.getOptions(key);
    //当打开目录是要选择文件时
    const { filePaths } = await dialog.showOpenDialog(this.win, options);
    if (filePaths[0]) {
      this.win.webContents.send(IpcChannel.SELECTED_DIR_RESULT, filePaths, key);
    }
  };

  save_as = async (file: FILE) => {
    //当打开目录是要选择文件时
    const { filePath } = await dialog.showSaveDialog({
      title: 'Save files',
      defaultPath: file.outsrc,
      filters: [
        {
          name: 'Images',
          extensions: [file.ext]
        }
      ]
    });

    if (filePath) {
      console.log(filePath);
      //防止特殊字符导致失败
      const Buffer = await fs.readFile(file.outsrc);
      await fs.writeFile(filePath, Buffer);
      // //保存成功 提示mssage
      // shell.showItemInFolder(filePath);
      webContentsActions(this.win).message('success', 'msg.finish');
    }
  };
  save_new_dir = async (files: FILE[]) => {
    const options = this.getOptions('SAVE_AS_DIR');
    //当打开目录是要选择文件时
    const { filePaths } = await dialog.showOpenDialog(this.win, options);
    log.info('filePaths', filePaths);
    if (filePaths[0]) {
      let count = 0;
      const len = files.length;
      this.setProgress(0, 1);
      files.forEach(async item => {
        //防止特殊字符导致失败
        const Buffer = await fs.readFile(item.outsrc);
        const outpath = item.outsrc.replace(item.outpath, filePaths[0]);
        await fs.writeFile(outpath, Buffer);
        count++;
        this.setProgress(count, len);
        if (count == len) {
          webContentsActions(this.win).message('success', '导出完成');
          shell.showItemInFolder(filePaths[0]);
        }
      });
    }
  };
}
