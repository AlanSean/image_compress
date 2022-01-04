import { BrowserWindow } from 'electron';
import { IpcMainLoader, IpcMainListenerAction } from './ipcMain';
import { MenuLoader } from './menu';
import { ProtocolLoader } from './protocol';
import { UpdateLoader } from './update';

export class Loader {
  public static load(win: BrowserWindow) {
    ProtocolLoader.load();
    MenuLoader.load();
    UpdateLoader.load();
    const ipcMainLoader = IpcMainLoader.load(win);

    return new Loader(ipcMainLoader.actions);
  }

  constructor(readonly ipcMainAction: IpcMainListenerAction) {}
}
