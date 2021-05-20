import { app, Menu, shell, MenuItemConstructorOptions } from 'electron';
import { MenuIpcChannel } from '../src/common/constants';
import { menuActions, setup } from './utils';

const isMac = process.platform === 'darwin';

let getLocales;
let menuInstance: Menu;
export function setMenu(isServe: boolean): void {
  getLocales = setup();
  const Menus: MenuItemConstructorOptions[] = [
    {
      label: app.name,
      submenu: [
        {
          id: 'About',
          label: getLocales('about'),
          click: menuActions.about
        },
        { type: 'separator' },
        isMac ? { role: 'close' } : { role: 'quit' }
      ]
    },
    {
      id: 'file',
      label: getLocales('menu.file'),
      submenu: [
        {
          id: MenuIpcChannel.ADD,
          label: getLocales('add'),
          click: menuActions.select_dir,
          enabled: true
        },
        {
          id: MenuIpcChannel.OPEN_FILE_DIR,
          label: getLocales('openFileDir'),
          click: menuActions.open_dir,
          enabled: false
        },
        {
          id: MenuIpcChannel.SAVE_NEW_DIR,
          label: getLocales('savenewdir'),
          click: menuActions.save_new_dir,
          enabled: false
        },
        {
          id: MenuIpcChannel.CLEAN,
          label: getLocales('clean'),
          click: menuActions.clean_file,
          enabled: false
        }
      ]
    },
    {
      id: 'help',
      label: getLocales('menu.help'),
      submenu: [
        {
          id: 'learnmore',
          label: getLocales('menu.learnmore'),
          click: async () => {
            await shell.openExternal('https://github.com/AlanSean/image_compress/blob/master/README.md');
          }
        },
        {
          id: 'update',
          label: getLocales('menu.update'),
          click: menuActions.checkForUpdates
        }
      ]
    }
  ];
  if (isServe) {
    Menus.push({
      label: 'Debug',
      submenu: [{ role: 'reload' }, { role: 'forceReload' }, { role: 'toggleDevTools' }]
    });
  }

  const menu = Menu.buildFromTemplate(Menus);
  Menu.setApplicationMenu(menu);
  menuInstance = menu;
}

export function menuEnabled(menuKeys: string[], enabled: boolean) {
  if (!menuInstance) return;
  menuKeys.forEach(v => {
    const menu = menuInstance.getMenuItemById(v);
    menu && (menu.enabled = enabled);
  });
}
