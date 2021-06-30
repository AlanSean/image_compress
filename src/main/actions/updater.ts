import { BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

autoUpdater.logger = log;

export class UpdaterAction {
  public handle(win: BrowserWindow) {
    autoUpdater.on('update-available', (info: any) => {
      log.info('update available', info.version);
      //---- buttons
      win;
    });
    autoUpdater.checkForUpdates();
  }
}
