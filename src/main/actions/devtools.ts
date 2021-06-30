//添加扩展
import { session } from 'electron';
import * as path from 'path';

export class ChromeDevtools {
  public handle() {
    const Angular_Gauntlets = this.getExtension('Angular_Gauntlets', '1.2.1');
    const Redux_DevTools = this.getExtension('Redux_DevTools', '2.17.0');
    session.defaultSession.loadExtension(Angular_Gauntlets, { allowFileAccess: true });
    session.defaultSession.loadExtension(Redux_DevTools, { allowFileAccess: true });
  }
  private getExtension(id: string, v: string): string {
    return path.resolve(`./Extensions/${id}/${v}_0`);
  }
}
