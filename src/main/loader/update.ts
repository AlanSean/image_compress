import { BrowserWindow } from 'electron';
import { UpdaterAction } from '../actions';

export class UpdateLoader {
  public static load(win: BrowserWindow) {
    new UpdaterAction().handle(win);
  }
}
