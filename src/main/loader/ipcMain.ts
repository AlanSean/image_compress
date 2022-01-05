import { BrowserWindow } from 'electron';
import {
  IpcMainAction,
  WebContentsAction,
  IpcMainListenerAction,
  OptimizeAction,
} from '../actions';

export { IpcMainAction, IpcMainListenerAction } from '../actions';

export class IpcMainLoader {
  public static load(win: BrowserWindow) {
    const webContents = win.webContents;
    const webContentsAction = new WebContentsAction(webContents);
    const optimizeAction = new OptimizeAction();
    const action = new IpcMainListenerAction(win, webContentsAction, optimizeAction);

    const ipcMainAction = new IpcMainAction(action);
    ipcMainAction.handle(win);

    return ipcMainAction;
  }
}
