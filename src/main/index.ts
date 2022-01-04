import * as os from 'os';
import * as path from 'path';
import * as url from 'url';
import { app, BrowserWindow, ipcMain, ipcRenderer } from 'electron';
import { Loader } from './loader';
import { ChromeDevtoolsLoader } from './loader/devtools';
import { isServe, isDebug } from './utils';
import { DefultSetting } from '../common/constants';
import { IpcMainLoader } from './loader/ipcMain';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';
const appName = 'image compress';

export default class App {
  openUrl: string[] | null = null;
  win: BrowserWindow | null = null;
  constructor() {
    app.setName(appName);

    this.secondInstance();
    this.windowAllClosed();

    Loader.load();
  }

  static load() {
    const main = new App();
    main.createProgram();
    return main;
  }

  static openFile() {
    // let openFiles: null  | string[] = null;
    // if(platform === 'darwin'){
    //   app.on('open-file', (event, url) => {
    //     console.log('url', url);
    //     openFiles = [url];
    //   });
    // }
    // if(platform === 'win32'){
    //   //
    //   openFiles = process.argv.slice(2);
    // }
    // app.once('browser-window-created',  (_, win: BrowserWindow) => {
    //   //
    //   ipcMain.once('Rendered', (_, setting: DefultSetting) => {
    //   });
    // });
  }

  static Rendered: Promise<DefultSetting> = new Promise(resolve => {
    ipcMain.once('Rendered', (_, setting: DefultSetting) => {
      resolve(setting);
    });
  });

  private ready() {
    const win = this.createWindow();

    this.win = win;
    this.loadURL(win);
  }

  private createProgram() {
    this.ready();
  }

  private createWindow() {
    return new BrowserWindow({
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
