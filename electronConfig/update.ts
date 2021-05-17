import { autoUpdater } from 'electron-updater';

import * as path from 'path';
import { isServe } from './utils';
import log from 'electron-log';

autoUpdater.logger = log;
// autoUpdater.logger.transports.file.level = "info"
if (isServe) {
  autoUpdater.updateConfigPath = path.join(__dirname, '../release/win-unpacked/resources/app-update.yml');
  // mac的地址是'Contents/Resources/app-update.yml'
}

export function Update() {
  autoUpdater.on('update-available', async (info: any) => {
    log.info('update available', info.version, info.path);
  });
  const status = autoUpdater.checkForUpdates();
  log.info(status);
}
