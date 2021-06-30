import { BrowserWindow } from 'electron';
import { IpcMainLoader } from './ipcMain';
import { MenuLoader } from './menu';
import { ProtocolLoader } from './protocol';
import { UpdateLoader } from './update';

export class Loader {
  public static load(win: BrowserWindow) {
    ProtocolLoader.load();
    IpcMainLoader.load(win);
    MenuLoader.load();
    UpdateLoader.load(win);
  }
}
