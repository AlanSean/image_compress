export enum SupportedExt {
  png = 'png',
  jpg = 'jpg',
}

export const enum TaskStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  DONE = 'DONE',
  FAIL = 'FAIL',
}

export const enum IpcChannel {
  FILE_SUM ='FILE_SUM',
  PROGRESS = 'PROGRESS',
  FILE_SELECT = 'FILE_SELECT',
  FILE_SELECTED = 'FILE_SELECTED',
  FILE_ADD = 'FILE_ADD',
  OPEN_DIR = "OPEN_DIR",
  OPTIMIZE = 'OPTIMIZE',
  SAVE = 'SAVE',
  SAVED = 'SAVED',
  SYNC = 'SYNC',
  APP_UPDATE = 'APP_UPDATE',
  READY = 'READY',
  DETECT_IMAGEMAGICK = 'DETECT_IMAGEMAGICK',
  OUT_DIR = 'OUT_DIR',
  SET_OUT_DIR = 'SET_OUT_DIR'
}

export const enum SaveType {
  OVER = 'OVER',
  NEW_NAME = 'NEW_NAME',
  NEW_DIR = 'NEW_DIR',
  SAVE_AS = 'SAVE_AS',
}

export interface IElectronResponse<T> {
  session: string
  error: string
  result: T
}

export interface IImageFile {
  id: string
  url: string
  size: number
  ext: SupportedExt
  originalName: string
}

export interface IOptimizeOptions {
  /**
   * 2~256, for PNG
   */
  color?: number

  /**
   * 10~100, for JPEG
   */
  quality?: number

  exportExt?: SupportedExt
}

export interface ITaskItem {
  id: string
  image: IImageFile
  options: IOptimizeOptions
  optimized?: IImageFile
  status: TaskStatus
}

export interface IOptimizeRequest {
  image: IImageFile
  options: IOptimizeOptions
  exportExt?: SupportedExt
}

export interface IBackendState {
  taskCount: number
  aloneMode: boolean
}

export interface IUpdateInfo {
  path: string
  githubArtifactName: string
  releaseName: string
  releaseNotes: string
  releaseDate: string
  sha512: string
  stagingPercentage: number
  version: string
}
export interface FILE{
  src:string;
  path:string;
  ext:string;//'png' 'jpg'
  outpath:string;
  outsrc: string;
}
export interface nowFILE extends FILE{
  rawDataSize: number
  nowDataSize: number
}

export interface compress_callback{
  (FILE: nowFILE): void
}

export const enum Storage{
  OUT_DIR = "OUT_DIR"
}