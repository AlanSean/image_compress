export const enum IpcChannel {
  PROGRESS = 'PROGRESS',
  FILE_SELECT = 'FILE_SELECT',
  FILE_SELECTED = 'FILE_SELECTED',
  FILE_ADD = 'FILE_ADD',
  SELECT_DIR = 'SELECT_DIR',
  SELECTED_DIR_RESULT = 'SELECTED_DIR_RESULT',
  FILE_UPDATE_QUALITY = 'FILE_UPDATE_QUALITY',
  FILE_UPDATE = 'FILE_UPDATE',
  OPEN_DIR = 'OPEN_DIR',
  CLEAN_FILE = 'CLEAN_FILE',
  SAVE_NEW_DIR = 'SAVE_NEW_DIR',
  SAVE_AS = 'SAVE_AS'
}
export const enum Message {
  TOAST = 'TOAST'
}
export const enum MenuIpcChannel {
  Enabled = 'Enabled',
  ADD = 'ADD',
  OPEN_FILE_DIR = 'OPEN_FILE_DIR',
  SAVE_NEW_DIR = 'SAVE_NEW_DIR',
  CLEAN = 'CLEAN'
}
const menus = [MenuIpcChannel.OPEN_FILE_DIR, MenuIpcChannel.SAVE_NEW_DIR, MenuIpcChannel.CLEAN];

export const getMenuEnableds = (isAll?: boolean) => {
  return isAll ? menus.concat(MenuIpcChannel.ADD) : menus;
};
export type FileExt = 'png' | 'jpg' | 'jpge' | 'webp';
export const fileExtReg = /jpg|png|jpeg|webp/;
export type messageType = 'success' | 'error' | 'loading' | 'remove' | 'warning';

export interface FILE {
  [key: string]: any;
  state: 'await' | 'finish' | 'error';
  src: string;
  path: string;
  name: string;
  extname: string; //"png" | "jpg" | "webp"
  ext: string; //".png" | ".jpg" | ".webp"
  outpath: string;
  outsrc: null | string;
  outdir: string;
  quality: string;
  rawDataSize: string;
  percentage: string;
  MD5KEY: string;
  nowDataSize: string;
  errorInfo?: string;
}

export interface compress_callback {
  (FILE: FILE): void;
}

export interface DefultSetting {
  outdir?: string;
  pngQuality?: string;
  jpgQuality?: string;
  webpQuality?: string;
}

export interface FileSetting extends DefultSetting {
  outpath?: string;
}

export interface settingType {
  [key: string]: string;
  outpath: string;
  outdir: string;
  quality: string;
}
