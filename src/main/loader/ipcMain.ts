import { BrowserWindow } from 'electron';
import { IpcMainAction, IpcMainListenerAction } from '../actions';

export class IpcMainLoader {
  public static load(win: BrowserWindow): void {
    const action = new IpcMainListenerAction(win);
    new IpcMainAction(action).handle(win);
  }
}
