import { BrowserWindow } from 'electron';
import { Message, messageType } from '../../src/common/constants';

export const webContentsActions = function (win: BrowserWindow) {
  return {
    message(type: messageType, message: string, options?: any) {
      win.webContents.send(Message.TOAST, type, message, options);
    }
  };
};
