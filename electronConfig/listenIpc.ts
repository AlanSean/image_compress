import { ipcMain, BrowserWindow } from 'electron';
import { FILE, IpcChannel } from '../src/common/constants';
import { compress } from './optimize';
import { DefultSetting } from '../src/utils/storage';

import { ListenIpcActions } from './utils';

export function listenIpc(win: BrowserWindow): void {
  // 监听回调函数
  const { file_add, select_dir, save_as, save_new_dir } = new ListenIpcActions(win);

  //添加文件
  ipcMain.on(IpcChannel.FILE_ADD, (_, files: string[], setting: DefultSetting) => {
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
  ipcMain.on(IpcChannel.SAVE_NEW_DIR, async (_, file: FILE[]) => {
    save_new_dir(file);
  });
}
