import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

autoUpdater.logger = log;
export function Update() {
  autoUpdater.on('update-available', async (info: any) => {
    log.info('update available', info.version);
  });
  autoUpdater.checkForUpdates();
}
