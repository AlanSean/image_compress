import * as os from 'os';
import * as fs from 'fs-extra';
import * as log from 'electron-log';
import { BrowserWindow, dialog, shell } from 'electron';
import { FILE, IpcChannel, settingType } from '../../src/common/constants';
import { dirSearchImg, compress } from '../optimize';
import { Queue } from './loop';
import { message, webContentsActions } from './webContents-actions';

export class ListenIpcActions {
  win!: BrowserWindow;
  message: message;
  constructor(win: BrowserWindow) {
    this.win = win;
    this.message = webContentsActions(this.win).message;
  }
  //打开文件夹的参数
  getOptions = (key?: 'SELECT_FILE' | 'SAVE_AS_DIR') => {
    //打开文件夹 的配置参数
    let options: Electron.OpenDialogSyncOptions;
    //当打开目录是要选择文件时
    if (key == 'SELECT_FILE') {
      options = {
        properties: ['openFile', 'multiSelections'],
        filters: [{ name: 'Images', extensions: ['jpg', 'png', 'jpge'] }]
      };
      //macos系统下允许选择文件夹
      if (os.platform() === 'darwin' && options.properties) {
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

  setProgress = (start: number, end: number) => {
    this.win.webContents.send(IpcChannel.PROGRESS, start, end);
  };

  //初次渲染
  fileSelected = (files: FILE | FILE[]): void => {
    this.win.webContents.send(IpcChannel.FILE_SELECTED, files);
  };
  filesQueue = new Queue<FILE>(this.fileSelected);

  //添加文件并压缩
  file_add = async (files: string[], setting: settingType) => {
    const sTime = new Date().getTime();
    const imgArr = await dirSearchImg(files, setting, [], this.filesQueue);
    log.info('time:', new Date().getTime() - sTime, imgArr.length);
    let count = 0;
    const len = imgArr.length;

    if (len == 0) {
      this.message('warning', 'msg.not_img_warning');
      return;
    }
    this.setProgress(0, 1);
    compress(imgArr, FILE => {
      // await delay(3);
      count++;
      this.setProgress(count, len);
      this.win.webContents.send(IpcChannel.FILE_UPDATE, FILE);
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
      defaultPath: file.outpath,
      filters: [
        {
          name: 'Images',
          extensions: [file.ext]
        }
      ]
    });

    if (filePath) {
      this.message('loading', 'msg.save_loading', {
        nzDuration: 0
      });
      //防止特殊字符导致失败
      const Buffer = await fs.readFile(file.outpath);
      await fs.writeFile(filePath, Buffer);
      // //保存成功 提示mssage
      // shell.showItemInFolder(filePath);
      this.message('success', 'msg.save_finish');
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
      webContentsActions(this.win).message('loading', 'msg.export_loading', {
        nzDuration: 0
      });
      files.forEach(async item => {
        const outpath = item.outpath.replace(item.outdir, filePaths[0]);
        await fs.copy(item.outpath, outpath);
        count++;
        this.setProgress(count, len);
        if (count == len) {
          webContentsActions(this.win).message('success', 'msg.export_finish');
          shell.showItemInFolder(filePaths[0]);
        }
      });
    }
  };
}
