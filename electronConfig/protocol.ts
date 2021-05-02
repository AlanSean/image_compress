import { protocol } from 'electron';
export function setProtocol(): void {
  //让electron 可以加载本地文件
  protocol.interceptFileProtocol('file', (req, callback) => {
    callback({
      url: req.url
    });
  });
}
