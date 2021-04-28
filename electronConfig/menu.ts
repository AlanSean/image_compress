import { app, Menu, shell, MenuItemConstructorOptions } from 'electron';
import { menuActions } from './utils';

const isMac = process.platform === 'darwin';

const Menus: MenuItemConstructorOptions[] = [
  {
    label: app.name,
    submenu: [
      {
        id: 'About',
        label: '关于我们',
        click: menuActions.about
      },
      { type: 'separator' },
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  {
    id: 'file',
    label: '文件',
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
    id: 'help',
    label: '帮助',
    submenu: [
      {
        id: 'learnmore',
        label: '了解更多',
        click: async () => {
          await shell.openExternal('https://github.com/AlanSean/image_compress/blob/master/README.md');
        }
      },
      {
        id: 'update',
        label: '检查更新',
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

export function UpdateMenuLanguage() {
  console.log(Menu.getApplicationMenu());
}
