import * as os from 'os';
import * as path from 'path';
import * as url from 'url';
import { app, BrowserWindow, ipcMain } from 'electron';
import { loadExtension, setProtocol, listenIpc, setMenu } from './electronConfig';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';

let win: BrowserWindow = null,
  loadingWindow: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createLoadingWindow() {
  //加载页面窗口
  loadingWindow = new BrowserWindow({
    height: 200,
    useContentSize: false,
    resizable: false, //禁止改变窗口大小
    width: 200,
    show: true,
    transparent: true,
    maximizable: false, //禁止双击放大
    frame: false, // 去掉顶部操作栏
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  });

  loadingWindow.loadURL(url.pathToFileURL(path.join(__dirname, serve ? 'src/' : 'dist/', 'assets/loading/loading.html')).href);

  loadingWindow.on('closed', () => {
    loadingWindow = null;
  });
  return loadingWindow;
}
function createWindow(): BrowserWindow {
  // Create the browser window.
  win = new BrowserWindow({
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
  setMenu(serve);
  if (serve) {
    win.webContents.openDevTools();

    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });

    //安装扩展
    loadExtension();
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.pathToFileURL(path.join(__dirname, 'dist/index.html')).href);
  }

  //设置自定义协议
  setProtocol();
  listenIpc.call(this, win);
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    // if(serve){
    //   app.quit();
    // }
    win = null;
  });

  return win;
}

try {
  // 第二个实例调用时
  const lodwin = app.requestSingleInstanceLock();
  if (!lodwin) app.quit();

  app.on('second-instance', () => {
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });
  app.on('ready', function () {
    // const loadingwindow = createLoadingWindow();
    createWindow();

    // loadingwindow.on('closed', () => {
    //   loadingWindow = null;
    // });
    // ipcMain.on('close-loading-window', (e, res) => {
    //   if (res.isClose && loadingWindow) {
    //     loadingwindow.close();
    //     win.show();
    //   }
    // });
  });

  app.on('window-all-closed', () => {
    app.quit();
  });

  app.on('activate', () => {
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
  app.quit();
}
