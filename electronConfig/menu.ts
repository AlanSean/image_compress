import { app, Menu, shell, MenuItemConstructorOptions } from 'electron';
import { MenuIpcChannel } from '../src/common/constants';
import { menuActions, setup } from './utils';

const isMac = process.platform === 'darwin';

let getLocals;
let menuInstance: Menu;
export function setMenu(isServe: boolean): void {
  getLocals = setup();
  const Menus: MenuItemConstructorOptions[] = [
    {
      label: app.name,
      submenu: [
        {
          id: 'About',
          label: getLocals('about'),
          click: menuActions.about
        },
        { type: 'separator' },
        isMac ? { role: 'close' } : { role: 'quit' }
      ]
    },
    {
      id: 'file',
      label: getLocals('menu.file'),
      submenu: [
        {
          id: MenuIpcChannel.ADD,
          label: getLocals('add'),
          click: menuActions.select_dir,
          enabled: true
        },
        {
          id: MenuIpcChannel.OPEN_FILE_DIR,
          label: getLocals('openFileDir'),
          click: menuActions.open_dir,
          enabled: false
        },
        {
          id: MenuIpcChannel.SAVE_NEW_DIR,
          label: getLocals('savenewdir'),
          click: menuActions.save_new_dir,
          enabled: false
        },
        {
          id: MenuIpcChannel.CLEAN,
          label: getLocals('clean'),
          click: menuActions.clean_file,
          enabled: false
        }
      ]
    },
    {
      id: 'help',
      label: getLocals('menu.help'),
      submenu: [
        {
          id: 'learnmore',
          label: getLocals('menu.learnmore'),
          click: async () => {
            await shell.openExternal('https://github.com/AlanSean/image_compress/blob/master/README.md');
          }
        },
        {
          id: 'update',
          label: getLocals('menu.update'),
          click: async () => {
            await shell.openExternal('https://github.com/AlanSean/image_compress/blob/master/README.md');
          }
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
    menuInstance.getMenuItemById(v).enabled = enabled;
  });
}
