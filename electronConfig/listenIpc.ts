import { ipcMain, BrowserWindow } from 'electron';
import { FILE, IpcChannel, MenuIpcChannel, settingType } from '../src/common/constants';
import { compress } from './optimize';

import { ListenIpcActions } from './utils';
import { menuEnabled } from './menu';

export function listenIpc(win: BrowserWindow): void {
  // 监听回调函数
  const { file_add, select_dir, save_as, save_new_dir } = new ListenIpcActions(win);

  //添加文件
  ipcMain.on(IpcChannel.FILE_ADD, (_, files: string[], setting: settingType) => {
    file_add(files, setting);
  });
  //选择文件或者文件夹
  ipcMain.on(IpcChannel.SELECT_DIR, (_, key?: 'SELECT_FILE') => {
    select_dir(key);
  });
  //设置 图片新质量再次压缩
  ipcMain.on(IpcChannel.FILE_UPDATE_QUALITY, (_, file) => {
    compress([file], FILE => {
      win.webContents.send(IpcChannel.FILE_UPDATE, FILE);
    });
  });
  //另存为
  ipcMain.on(IpcChannel.SAVE_AS, (_, file: FILE) => {
    save_as(file);
  });
  //另存为
  ipcMain.on(IpcChannel.SAVE_NEW_DIR, (_, file: FILE[]) => {
    save_new_dir(file);
  });

  //更新menu 状态
  ipcMain.on(MenuIpcChannel.Enabled, (_, keys: string[], enabled) => {
    menuEnabled(keys, enabled);
  });
}
