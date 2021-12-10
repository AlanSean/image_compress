import * as os from 'os';
import {
  BrowserWindow,
  shell,
  app,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
  dialog,
} from 'electron';
import { MenuIpcChannel, IpcChannel } from '../../common/constants';
import { Locales, isServe, isDebug } from '../utils';
import { UpdaterAction } from './updater';

class MenuAction {
  private updaterAction = new UpdaterAction();
  private isMac = process.platform === 'darwin';
  private menuInstance: Menu | null = null;
  private AboutLink = '';
  getMenuInstance() {
    if (this.menuInstance === null) {
      this.menuInstance = this.setMenu();
    }
    return this.menuInstance;
  }

  setMenu() {
    !this.AboutLink && this.setAboutLink();
    const getLocales = new Locales().getLocales;
    const Menus: MenuItemConstructorOptions[] = [
      {
        label: app.name,
        submenu: [
          {
            id: 'About',
            label: getLocales('about'),
            click: this.about,
          },
          { type: 'separator' },
          this.isMac ? { role: 'close' } : { role: 'quit' },
        ],
      },
      {
        id: 'file',
        label: getLocales('menu.file'),
        submenu: [
          {
            id: MenuIpcChannel.ADD,
            label: getLocales('add'),
            click: this.select_dir,
            enabled: true,
          },
          {
            id: MenuIpcChannel.OPEN_FILE_DIR,
            label: getLocales('openFileDir'),
            click: this.open_dir,
            enabled: false,
          },
          {
            id: MenuIpcChannel.SAVE_NEW_DIR,
            label: getLocales('savenewdir'),
            click: this.save_new_dir,
            enabled: false,
          },
          {
            id: MenuIpcChannel.CLEAN,
            label: getLocales('clean'),
            click: this.clean_file,
            enabled: false,
          },
        ],
      },
      {
        id: 'help',
        label: getLocales('menu.help'),
        submenu: [
          {
            id: 'learnmore',
            label: getLocales('menu.learnmore'),
            click: async () => {
              await shell.openExternal(this.AboutLink);
            },
          },
          { type: 'separator' },
          {
            id: 'update',
            label: getLocales('menu.update'),
            click: this.checkUpdate,
          },
          { type: 'separator' },
          {
            id: 'About',
            label: getLocales('about'),
            click: this.about,
          },
        ],
      },
    ];
    if (isServe || isDebug) {
      Menus.push({
        label: 'Debug',
        submenu: [{ role: 'reload' }, { role: 'forceReload' }, { role: 'toggleDevTools' }],
      });
    }

    const menu = Menu.buildFromTemplate(Menus);
    Menu.setApplicationMenu(menu);
    this.menuInstance = menu;
    return menu;
  }

  menuEnabled(menuKeys: string[], enabled: boolean) {
    const menuInstance = this.getMenuInstance();

    menuKeys.forEach(v => {
      const menuItem = menuInstance.getMenuItemById(v);

      if (menuItem) {
        menuItem.enabled = enabled;
      }
    });
  }
  private setAboutLink() {
    // const lang = app.getLocale();
    this.AboutLink = 'https://github.com/AlanSean/image_compress/blob/master/README.md';
  }
  private about = (_: MenuItem, win?: BrowserWindow) => {
    win &&
      dialog.showMessageBoxSync(win, {
        type: 'info',
        title: app.name,
        message: app.name,
        normalizeAccessKeys: true,
        detail: `
          version: ${this.updaterAction.version}.version as string}
          Electron: ${process.versions.electron}
          Chrome: ${process.versions.chrome}
          Node.js: ${process.versions.node}
          V8: ${process.versions.v8}
          OS: ${os.type()} ${os.arch()} ${os.release()}
          NODE_ENV:${process.env.NODE_ENV ?? 'null'}
        `,
      });
  };
  //选择文件 压缩
  private select_dir = (_: MenuItem, win?: BrowserWindow) => {
    win?.webContents.send(IpcChannel.SELECT_DIR, 'SELECT_FILE');
  };

  // 打开输出目录
  private open_dir = (_: MenuItem, win?: BrowserWindow) => {
    win?.webContents.send(IpcChannel.OPEN_DIR);
  };

  //另存为
  private save_new_dir = (_: MenuItem, win?: BrowserWindow) => {
    win?.webContents.send(IpcChannel.SAVE_NEW_DIR);
  };

  //清空 文件
  private clean_file = (_: MenuItem, win?: BrowserWindow) => {
    win?.webContents.send(IpcChannel.CLEAN_FILE);
  };

  //清空 文件
  private checkUpdate = (_: MenuItem, win?: BrowserWindow) => {
    win && this.updaterAction.checkForUpdates();
    shell.openExternal('https://github.com/AlanSean/image_compress/releases');
  };
}

export const menuAction = new MenuAction();
