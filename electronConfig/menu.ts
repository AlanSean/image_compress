import { app, Menu, shell, MenuItemConstructorOptions } from "electron";
import { menuActions } from "./utils";

const isMac = process.platform === "darwin";

const Menus: MenuItemConstructorOptions[] = [
  {
    label: app.name,
    submenu: [
      {
        label: "About",
        click: menuActions.about,
      },
      { type: "separator" },
      { role: "quit" },
    ],
  },
  {
    label: "File",
    submenu: [isMac ? { role: "close" } : { role: "quit" }],
  },
  {
    role: "help",
    submenu: [
      {
        label: "Learn More",
        click: async () => {
          await shell.openExternal(
            "https://github.com/AlanSean/image_compress/blob/master/README.md"
          );
        },
      },
      {
        label: "update",
        click: async () => {
          await shell.openExternal(
            "https://github.com/AlanSean/image_compress/blob/master/README.md"
          );
        },
      },
    ],
  },
];

export function setMenu(isServe: boolean): void {
  if (isServe) {
    Menus.push({
      label: "Debug",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
      ],
    });
  }
  const menu = Menu.buildFromTemplate(Menus);
  Menu.setApplicationMenu(menu);
}
