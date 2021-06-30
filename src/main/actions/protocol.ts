import { protocol } from 'electron';

export class ProtocolAction {
  public handle() {
    protocol.interceptFileProtocol('file', (req, callback) => {
      callback({
        url: encodeURI(req.url)
      });
    });
  }
}
