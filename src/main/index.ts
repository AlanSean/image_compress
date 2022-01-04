import * as os from 'os';
import * as path from 'path';
import * as url from 'url';
import { app, BrowserWindow, ipcMain } from 'electron';
import { Loader } from './loader';
import { ChromeDevtoolsLoader } from './loader/devtools';
import { isServe, isDebug, platform } from './utils';
import { DefultSetting } from '../common/constants';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';
const appName = 'image compress';

class App {
  openUrl: string[] | null = null;
  win: BrowserWindow | null = null;
  loader!: Loader;
  constructor() {
    app.setName(appName);
  }

  public openFile() {
    if (isServe) return;

    let openFiles: null | string[] = null;

    if (platform === 'darwin') {
      app.on('open-file', (event, url) => {
        console.log('url', url);
        openFiles = [url];
      });
    }

    if (platform === 'win32') {
      openFiles = process.argv.slice(2);
    }

    ipcMain.once('Rendered', (_, setting: DefultSetting) => {
      if (openFiles) {
        console.log(openFiles);
        this.loader.ipcMainAction.file_add(openFiles, setting);
      }
    });
  }

  public ready() {
    this.secondInstance();
    this.windowAllClosed();
    this.createProgram();
  }
  private createProgram() {
    const win = this.createWindow();

    this.loader = Loader.load(win);
    this.loadURL(win);
  }

  private createWindow() {
    if (this.win === null) {
      this.win = new BrowserWindow({
        width: 800 + (os.platform() === 'darwin' ? 15 : 34),
        height: 600,
        minWidth: 560,
        minHeight: 560,
        icon: path.join(__dirname, '../renderer/assets/icons/favicon.ico'),
        // show: false,
        frame: true, // 去掉顶部操作栏
        webPreferences: {
          webSecurity: false, //允许加载本地资源
          nodeIntegration: true,
          // allowRunningInsecureContent: serve ? true : false,
          contextIsolation: false, // false if you want to run 2e2 test with Spectron
        },
      });
    }

    return this.win;
  }

  private loadURL(win: BrowserWindow) {
    if (isServe || isDebug) {
      win.webContents.openDevTools();
      //安装扩展
      ChromeDevtoolsLoader.load();
    }

    if (isServe) {
      win.loadURL('http://localhost:4200');
    } else {
      win.loadURL(url.pathToFileURL(path.join(__dirname, '../renderer/index.html')).href);
    }
  }

  private secondInstance() {
    app.on('second-instance', () => {
      const win = this.win;

      if (win) {
        if (win.isMinimized()) win.restore();
        win.focus();
      }
    });
  }

  private windowAllClosed() {
    app.on('window-all-closed', () => {
      app.quit();
    });
  }
}

export default new App();
