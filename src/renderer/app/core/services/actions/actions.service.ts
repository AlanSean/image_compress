import { Injectable } from '@angular/core';
import { IpcChannel, FILE, MenuIpcChannel } from '@common/constants';
import { getSetting } from '@utils/storage';
import { ipcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  constructor() {}
  fileAdd(files: string[]) {
    const setting = getSetting();
    ipcRenderer.send(IpcChannel.FILE_ADD, files, setting);
  }
  //选择文件
  select_dir(key?: string) {
    ipcRenderer.send(IpcChannel.SELECT_DIR, key);
  }
  //另存为
  saveAs(item: FILE) {
    ipcRenderer.send(IpcChannel.SAVE_AS, item);
  }

  //向主进程发送 file_update_quality指令 进行按新质量压缩
  file_update_quality(file: FILE) {
    ipcRenderer.send(IpcChannel.FILE_UPDATE_QUALITY, file);
  }
  menuEnabled(keys: MenuIpcChannel[], enabled: boolean) {
    ipcRenderer.send(MenuIpcChannel.Enabled, keys, enabled);
  }
}
