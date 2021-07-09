import { BrowserWindow } from 'electron';
import { IpcMainAction, WebContentsAction, IpcMainListenerAction, OptimizeAction } from '../actions';

export class IpcMainLoader {
  public static load(win: BrowserWindow): void {
    const webContents = win.webContents;
    const webContentsAction = new WebContentsAction(webContents);
    const optimizeAction = new OptimizeAction();
    const action = new IpcMainListenerAction(win, webContentsAction, optimizeAction);
    new IpcMainAction(action).handle(win);
  }
}
