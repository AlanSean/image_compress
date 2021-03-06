import { BrowserWindow, shell } from 'electron';
import { IpcChannel } from '../../common/constants';

export async function about(): Promise<void> {
  await shell.openExternal('https://github.com/AlanSean/image_compress/blob/master/README.md');
}

//选择文件 压缩
export async function select_dir(_, win: BrowserWindow) {
  win.webContents.send(IpcChannel.SELECT_DIR, 'SELECT_FILE');
}

// 打开输出目录
export async function open_dir(_, win: BrowserWindow) {
  win.webContents.send(IpcChannel.OPEN_DIR);
}

//另存为
export async function save_new_dir(_, win: BrowserWindow) {
  win.webContents.send(IpcChannel.SAVE_NEW_DIR);
}

//清空 文件
export async function clean_file(_, win: BrowserWindow) {
  win.webContents.send(IpcChannel.CLEAN_FILE);
}
