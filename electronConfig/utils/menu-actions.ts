import { BrowserWindow, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import { IpcChannel } from '../../src/common/constants';

export async function about(): Promise<void> {
  await shell.openExternal('https://github.com/AlanSean/image_compress/blob/master/README.md');
}

//选择文件 压缩
export function select_dir(_: any, win?: BrowserWindow) {
  win?.webContents.send(IpcChannel.SELECT_DIR, 'SELECT_FILE');
}

// 打开输出目录
export function open_dir(_: any, win?: BrowserWindow) {
  win?.webContents.send(IpcChannel.OPEN_DIR);
}

//另存为
export function save_new_dir(_: any, win?: BrowserWindow) {
  win?.webContents.send(IpcChannel.SAVE_NEW_DIR);
}

//清空 文件
export function clean_file(_: any, win?: BrowserWindow) {
  win?.webContents.send(IpcChannel.CLEAN_FILE);
}

export function checkForUpdates() {
  autoUpdater.checkForUpdates();
}
