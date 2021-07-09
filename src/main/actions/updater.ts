import { BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';

export class UpdaterAction {
  public handle(win: BrowserWindow) {
    const log = require('electron-log');
    log.transports.file.level = 'debug';
    autoUpdater.logger = log;
    // autoUpdater.on('update-available', (info: any) => {
    //   log.info('update available', info.version);
    //   //---- buttons
    //   win;
    // });
    autoUpdater.checkForUpdates().then(reslut => {
      console.log(reslut);
    });
  }
}
