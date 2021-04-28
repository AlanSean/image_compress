import { app, Menu, shell, MenuItemConstructorOptions } from 'electron';
import { menuActions } from './utils';

const isMac = process.platform === 'darwin';

const Menus: MenuItemConstructorOptions[] = [
  {
    label: app.name,
    submenu: [
      {
        label: 'About',
        click: menuActions.about
      },
      { type: 'separator' },
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  {
    label: 'File',
    submenu: [
      {
        id: 'add',
        label: '添加',
        click: menuActions.select_dir,
        enabled: true
      },
      {
        id: 'openFileDir',
        label: '在资源管理器中显示',
        click: menuActions.open_dir,
        enabled: false
      },
      {
        id: 'savenewdir',
        label: '导出到新文件夹',
        click: menuActions.save_new_dir,
        enabled: false
      },
      {
        id: 'clean',
        label: '清空',
        click: menuActions.clean_file,
        enabled: false
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          await shell.openExternal('https://github.com/AlanSean/image_compress/blob/master/README.md');
        }
      },
      {
        label: 'update',
        click: async () => {
          await shell.openExternal('https://github.com/AlanSean/image_compress/blob/master/README.md');
        }
      }
    ]
  }
];

export function setMenu(isServe: boolean): void {
  if (isServe) {
    Menus.push({
      label: 'Debug',
      submenu: [{ role: 'reload' }, { role: 'forceReload' }, { role: 'toggleDevTools' }]
    });
  }
  const menu = Menu.buildFromTemplate(Menus);
  Menu.setApplicationMenu(menu);
}

export function UpdateMenu() {
  console.log(Menu.getApplicationMenu());
}
