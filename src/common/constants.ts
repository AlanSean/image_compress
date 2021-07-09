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

export type FileExt = 'png' | 'jpg' | 'jpge' | 'webp';

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
  outsrc: string;
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

export interface SelecteDirCallBack {
  (filePaths: string[], key?: 'SELECT_FILE'): void;
}
export interface DefultSetting {
  outdir: string;
  pngQuality: string;
  jpgQuality: string;
  webpQuality: string;
}

export interface SettingOptions {
  outdir?: string;
  pngQuality?: string;
  jpgQuality?: string;
  webpQuality?: string;
}

export interface ExpMap {
  [key: string]: {
    ext: 'png' | 'jpg' | 'jpeg' | 'webp';
    quality: 'pngQuality' | 'jpgQuality' | 'webpQuality';
  };
}

export interface CompressImageInfo {
  status: number;
  data: Buffer | string;
  nowDataSize: number;
  percentage: number;
  errorInfo?: string;
}

export interface LangData {
  add: string;
  save: string;
  saveOverwrite: string;
  savenewdir: string;
  saveAs: string;
  openFileDir: string;
  down: string;
  clean: string;
  about: string;
  defaultOutdir: string;
  quality: string;
  setting: string;
  error: string;
  await: string;
  finish: string;
  remove: string;
  msg: {
    export_finish: string;
    save_finish: string;
    save_loading: string;
    export_loading: string;
    not_img_warning: string;
  };
  menu: {
    file: string;
    about: string;
    add: string;
    openFileDir: string;
    savenewdir: string;
    clean: string;
    help: string;
    learnmore: string;
    update: string;
  };
}
