import { isServe } from './utils';

let electronLog: any = null;

export function log(...msg: any[]) {
  if (isServe && electronLog == null) {
    electronLog = require('electron-log');
    electronLog.transports.console.level = 'silly';
  }
  isServe && electronLog && electronLog.log(...msg);
}
export function errorLog(...msg: any[]) {
  if (isServe && electronLog == null) {
    electronLog = require('electron-log');
    electronLog.transports.console.level = 'silly';
  }
  isServe && electronLog && electronLog.errorLog(...msg);
}
