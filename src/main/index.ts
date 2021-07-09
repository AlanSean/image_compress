import * as os from 'os';
import * as path from 'path';
import * as url from 'url';
import { app, BrowserWindow } from 'electron';

import { Loader } from './loader';

import { ChromeDevtoolsLoader } from './loader/devtools';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

export class App {
  static load() {
    const main = new App();
    main.createProgram();
    return main;
  }

  private createProgram() {
    this.windowAllClosed();
    const win = this.createWindow();
    Loader.load(win);
    this.secondInstance(win);
    this.loadURL(win);
  }

  private createWindow() {
    return new BrowserWindow({
      width: 800 + (os.platform() === 'darwin' ? 15 : 34),
      height: 600,
      minWidth: 560,
      minHeight: 560,
      icon: path.join(__dirname, 'favicon.ico'),
      // show: false,
      frame: true, // 去掉顶部操作栏
      webPreferences: {
        webSecurity: false, //允许加载本地资源
        nodeIntegration: true,
        // allowRunningInsecureContent: serve ? true : false,
        contextIsolation: false, // false if you want to run 2e2 test with Spectron
        enableRemoteModule: true // true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)
      }
    });
  }
  private loadURL(win: BrowserWindow) {
    if (serve) {
      win.webContents.openDevTools();
      //安装扩展
      ChromeDevtoolsLoader.load();
      win.loadURL('http://localhost:4200');
    } else {
      win.loadURL(url.pathToFileURL(path.join(__dirname, '../renderer/index.html')).href);
    }
  }
  private secondInstance(win: BrowserWindow) {
    app.on('second-instance', () => {
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
