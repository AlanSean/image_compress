import { MenuIpcChannel } from '@common/constants';

const menus = [MenuIpcChannel.OPEN_FILE_DIR, MenuIpcChannel.SAVE_NEW_DIR, MenuIpcChannel.CLEAN];

export const getMenuEnableds = (isAll?: boolean) => {
  return isAll ? menus.concat(MenuIpcChannel.ADD) : menus;
};
