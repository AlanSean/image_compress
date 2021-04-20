export const enum IpcChannel {
  PROGRESS = "PROGRESS",
  FILE_SELECT = "FILE_SELECT",
  FILE_SELECTED = "FILE_SELECTED",
  FILE_ADD = "FILE_ADD",
  SELECT_DIR = "SELECT_DIR",
  SELECTED_DIR_RESULT = "SELECTED_DIR_RESULT",
  FILE_UPDATE_QUALITY = "FILE_UPDATE_QUALITY",
  FILE_UPDATE = "FILE_UPDATE",
}
export interface FILE {
  state: 'await'  | 'finish';
  src: string;
  path: string;
  extname: string; //"png" | "jpg" | "jpge"
  ext: string; //".png" | ".jpg" | ".jpge"
  outpath: string;
  outsrc: string;
  quality: string;
  rawDataSize: string;
  percentage: string;
  MD5KEY?:string;
}
export interface nowFILE extends FILE{
  nowDataSize: string
}

export interface compress_callback{
  (FILE: nowFILE): void
}
