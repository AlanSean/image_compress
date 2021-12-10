import { isServe, isTest } from './utils';

const flag = isServe || isTest;
let electronLog: any = null;

export function log(...msg: any[]) {
  if (flag && electronLog == null) {
    electronLog = require('electron-log');
    electronLog.transports.console.level = 'info';
  }
  flag && electronLog && electronLog.info(...msg);
}
export function errorLog(...msg: any[]) {
  if (flag && electronLog == null) {
    electronLog = require('electron-log');
    electronLog.transports.console.level = 'error';
  }
  flag && electronLog && electronLog.error(...msg);
}
