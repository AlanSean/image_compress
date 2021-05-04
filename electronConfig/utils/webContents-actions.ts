import { BrowserWindow } from 'electron';
import { Message, messageType } from '../../src/common/constants';

export type message = (type: messageType, message: string, options?: any) => void;
export type WebContentsActions = (win: BrowserWindow) => { message: message};



export const webContentsActions: WebContentsActions = function (win) {
  return {
    message(type, message, options) {
      win.webContents.send(Message.TOAST, type, message, options);
    }
  };
};
