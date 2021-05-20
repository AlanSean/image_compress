import { dialog, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
// import * as log from 'electron-log';

// autoUpdater.logger = log;
autoUpdater.autoDownload = false;
// let updater: any;

export function Update(win: BrowserWindow) {
  autoUpdater.on('error', error => {
    dialog.showErrorBox('Error: ', error == null ? 'unknown' : (error.stack || error).toString());
  });

  // 可更新
  autoUpdater.on('update-available', () => {
    dialog
      .showMessageBox(win, {
        type: 'info',
        title: 'Found Updates',
        message: 'Found updates, do you want update now?',
        buttons: ['Sure', 'No']
      })
      .then(({ response }) => {
        if (response === 0) {
          autoUpdater.downloadUpdate();
        } else {
          // updater.enabled = true;
          // updater = null;
        }
      });
  });
  //没有更新
  autoUpdater.on('update-not-available', () => {
    // dialog.showMessageBox({
    //   title: 'No Updates',
    //   message: 'Current version is up-to-date.',
    // });
    dialog
      .showMessageBox(win, {
        type: 'info',
        title: 'Found Updates',
        message: 'Found updates, do you want update now?',
        buttons: ['Sure', 'No']
      })
      .then(({ response }) => {
        if (response === 0) {
          autoUpdater.downloadUpdate();
        } else {
          // updater.enabled = true;
          // updater = null;
        }
      });
    // updater.enabled = true;
    // updater = null;
  });
  //开始更新
  autoUpdater.on('update-downloaded', () => {
    dialog
      .showMessageBox(win, {
        title: 'Install Updates',
        message: 'Updates downloaded, application will be quit for update...'
      })
      .then(() => {
        setImmediate(() => autoUpdater.quitAndInstall());
      });
  });
}
