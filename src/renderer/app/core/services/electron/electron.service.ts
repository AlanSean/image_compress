import * as fs from 'fs-extra';
import * as path from 'path';
import { Injectable } from '@angular/core';
import { ipcRenderer, IpcRendererEvent, shell } from 'electron';

import { FILE, IpcChannel, MenuIpcChannel, Message, messageType, SelecteDirCallBack } from '@common/constants';
import { getSetting, mkOutdir, getMenuEnableds } from '@utils/index';
import { ListenerService } from '../listener/listener.service';
import { ActionsService } from '../actions/actions.service';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  constructor(private actions: ActionsService, private ipcListener: ListenerService) {
    this.addFile();
    this.updateFile();
    this.selectDir();
    this.openDir();
    this.saveNewDir();
    this.cleanFile();
    this.toast();
  }

  //打开默认输出目录
  async showItemInFolder(outdir: string): Promise<void> {
    const dirPath = path.resolve(outdir);
    try {
      console.log('openDir:', dirPath);
      await fs.stat(dirPath);
      shell.showItemInFolder(dirPath);
    } catch (e) {
      await mkOutdir(dirPath);
      shell.showItemInFolder(dirPath);
    }
  }
  //清空文件夹

  clean = () => {
    this.ipcListener.cleanFile();
    this.actions.menuEnabled([MenuIpcChannel.ADD], true);
    this.actions.menuEnabled(getMenuEnableds(false), false);
  };
  //打开默认输出目录
  async openFileDir(filepath: string): Promise<void> {
    const filePath = path.resolve(filepath);
    try {
      console.log('openFileDir:', filePath);
      await fs.stat(filePath);
      shell.showItemInFolder(filePath);
    } catch (e) {
      //文件不存在
      console.log(e);
    }
  }

  private addFile() {
    ipcRenderer.on(IpcChannel.FILE_SELECTED, (_: IpcRendererEvent, file: FILE | Array<FILE>) => {
      this.ipcListener.add(file);
    });
  }
  private updateFile() {
    ipcRenderer.on(IpcChannel.FILE_UPDATE, (_: IpcRendererEvent, file: FILE | Array<FILE>) => {
      this.ipcListener.update(file);
    });
  }
  //窗口菜单 发起的选择文件
  private selectDir = () => {
    ipcRenderer.on(IpcChannel.SELECT_DIR, (_: IpcRendererEvent, key: string) => {
      this.actions.select_dir(key);
    });
  };
  private openDir = () => {
    ipcRenderer.on(IpcChannel.OPEN_DIR, () => {
      const outdir = getSetting().outdir;
      this.openFileDir(outdir);
    });
  };
  private saveNewDir = () => {
    ipcRenderer.on(IpcChannel.SAVE_NEW_DIR, this.ipcListener.saveNewDir);
  };

  private cleanFile() {
    ipcRenderer.on(IpcChannel.CLEAN_FILE, this.clean);
  }
  //消息
  private toast = () => {
    ipcRenderer.on(Message.TOAST, (_: IpcRendererEvent, type: messageType, message: string, options?: number) => {
      this.ipcListener.toast(type, message, options);
    });
  };
  selecteDirResult = (callback: SelecteDirCallBack) => {
    ipcRenderer.on(IpcChannel.SELECTED_DIR_RESULT, (_, filePaths: string[], key?: 'SELECT_FILE') => {
      callback(filePaths, key);
    });
  };
  updateProgress = (callback: (progress: number) => void) => {
    ipcRenderer.on(IpcChannel.PROGRESS, (_, current: number, sum: number) => {
      callback((current / sum) * 100);
    });
  };
}
