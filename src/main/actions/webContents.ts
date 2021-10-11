import { WebContents } from 'electron';
import { FILE, IpcChannel, Message, messageType } from '../../common/constants';
import { SELECTED_DIR_RESULT } from '../../common/function';

export class WebContentsAction {
  constructor(readonly webContents: WebContents) {}
  appUpdate() {}
  message(type: messageType, message: string, options?: any) {
    this.webContents.send(Message.TOAST, type, message, options);
  }
  fileSelected = (files: FILE | FILE[]): void => {
    this.webContents.send(IpcChannel.FILE_SELECTED, files);
  };
  fileUpdate(files: FILE | FILE[]) {
    this.webContents.send(IpcChannel.FILE_UPDATE, files);
  }
  setProgress = (start: number, end: number) => {
    this.webContents.send(IpcChannel.PROGRESS, start, end);
  };
  selecedDirResult: SELECTED_DIR_RESULT = (filePaths, key) => {
    this.webContents.send(IpcChannel.SELECTED_DIR_RESULT, filePaths, key);
  };
}
