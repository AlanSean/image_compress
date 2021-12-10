import { autoUpdater } from 'electron-updater';

export class UpdaterAction {
  version = autoUpdater.currentVersion.version;
  public handle() {
    this.updateAvailable();
  }

  private updateAvailable() {
    autoUpdater.on('update-available', info => {
      console.log(info);
    });
  }

  checkForUpdates() {
    autoUpdater.checkForUpdatesAndNotify();
  }
}
