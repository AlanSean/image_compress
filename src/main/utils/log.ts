import * as electronLog from 'electron-log';
import { isServe, isDebug } from './utils';

export function replaceLog() {
  const flag = isServe || isDebug;

  electronLog.transports.file.level = false;
  electronLog.transports.console.level = flag ? 'debug' : flag;
  if (flag) {
    Object.assign(console, electronLog.functions);
  }
}

replaceLog();
