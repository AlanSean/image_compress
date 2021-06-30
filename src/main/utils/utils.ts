import * as os from 'os';

const args = process.argv.slice(1);
export const isServe = args.some(val => val === '--serve');

// 保留几位小数
export const fixed = (number: number, digit: number): number => Number(number.toFixed(digit));
//转换百分比
export const percent = (rate: number): string => `${fixed(rate * 100, 1)}%`;

//字节转换
export function byteConver(byte: number): string {
  if (byte > 1073741824) {
    return `${fixed(byte / 1073741824, 2)} GB`;
  }
  if (byte > 1048576) {
    return `${fixed(byte / 1048576, 2)} MB`;
  }
  if (byte > 1024) {
    return `${fixed(byte / 1024, 2)} KB`;
  }
  return `${fixed(byte, 2)} B`;
}

//延时
export const delay = async function name(time: number): Promise<boolean> {
  return new Promise(reslove => {
    setTimeout(() => {
      reslove(true);
    }, time);
  });
};

export function getOptions(key?: 'SELECT_FILE' | 'SAVE_AS_DIR') {
  //打开文件夹 的配置参数
  let options: Electron.OpenDialogSyncOptions = {};
  //当打开目录是要选择文件时
  if (key == 'SELECT_FILE') {
    options = {
      properties: ['openFile', 'multiSelections'],
      filters: [{ name: 'Images', extensions: ['jpg', 'png', 'jpge'] }]
    };
    //macos系统下允许选择文件夹
    if (os.platform() === 'darwin') {
      options.properties?.push('openDirectory');
    }
  } else if (key == 'SAVE_AS_DIR') {
    options = {
      properties: ['createDirectory', 'openDirectory']
    };
  } else {
    options = {
      properties: ['createDirectory', 'openDirectory', 'multiSelections']
    };
  }
  return options;
}
