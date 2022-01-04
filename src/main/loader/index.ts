import { app, BrowserWindow } from 'electron';
import { IpcMainLoader } from './ipcMain';
import { MenuLoader } from './menu';
import { ProtocolLoader } from './protocol';
import { UpdateLoader } from './update';

export class Loader {
  public static load() {
    ProtocolLoader.load();
    MenuLoader.load();
    UpdateLoader.load();

    app.once('browser-window-created', (_, win: BrowserWindow) => {
      IpcMainLoader.load(win);
    });
  }
}
