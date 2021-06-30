import { ipcMain, BrowserWindow } from 'electron';
import { FILE, IpcChannel, MenuIpcChannel, DefultSetting } from '../../common/constants';

import { IpcMainListenerAction } from './ipcMainListener';
import { compress } from '../config';

export class IpcMainAction {
  constructor(readonly actions: IpcMainListenerAction) {}
  public handle(win: BrowserWindow) {
    this.fileAdd();
    this.selectDir();
    this.fileUpdateQuality(win);
    this.saveAs();
    this.saveNewDir();
    this.menuEnabled();
  }

  private fileAdd() {
    ipcMain.on(IpcChannel.FILE_ADD, (_, files: string[], setting: DefultSetting) => {
      this.actions.file_add(files, setting);
    });
  }

  private selectDir() {
    //选择文件或者文件夹
    ipcMain.on(IpcChannel.SELECT_DIR, (_, key?: 'SELECT_FILE') => {
      this.actions.select_dir(key);
    });
  }
  private fileUpdateQuality(win: BrowserWindow) {
    ipcMain.on(IpcChannel.FILE_UPDATE_QUALITY, (_, file) => {
      compress([file], FILE => {
        win.webContents.send(IpcChannel.FILE_UPDATE, FILE);
      });
    });
  }
  private saveAs() {
    ipcMain.on(IpcChannel.SAVE_AS, (_, file: FILE) => {
      this.actions.save_as(file);
    });
  }

  private saveNewDir() {
    ipcMain.on(IpcChannel.SAVE_NEW_DIR, (_, file: FILE[]) => {
      this.actions.save_new_dir(file);
    });
  }

  private menuEnabled() {
    ipcMain.on(MenuIpcChannel.Enabled, (_, keys: string[], enabled) => {
      this.actions.menuEnabled(keys, enabled);
    });
  }
}
