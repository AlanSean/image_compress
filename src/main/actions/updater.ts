import { autoUpdater } from 'electron-updater';

import { log } from '../utils/index';

export class UpdaterAction {
  version = autoUpdater.currentVersion.version;
  public handle() {
    this.updateAvailable();
  }

  private updateAvailable() {
    autoUpdater.on('update-available', info => {
      log(info);
    });
  }

  checkForUpdates() {
    autoUpdater.checkForUpdatesAndNotify();
  }
}
