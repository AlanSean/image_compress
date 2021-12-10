// import { BrowserWindow } from 'electron';
import { UpdaterAction } from '../actions';

export class UpdateLoader {
  public static load() {
    new UpdaterAction().handle();
  }
}
