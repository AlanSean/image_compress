import { Injectable } from '@angular/core';
import { IpcChannel, FILE, MenuIpcChannel } from '@common/constants';
import { getSetting } from '@utils/storage';
import { ipcRenderer } from 'electron';

@Injectable({
  providedIn: 'root',
})
export class ActionsService {
  constructor() {}
  rendered() {
    ipcRenderer.send('Rendered', {
      ...getSetting(),
    });
  }

  fileAdd(files: string[]) {
    const setting = getSetting();
    const reg = new RegExp(`^(?!${getSetting().outdir}).*\\.(jpg|jpeg|webp|png)$`);

    files = files.filter(path => reg.test(path));
    if (files.length > 0) {
      ipcRenderer.send(IpcChannel.FILE_ADD, files, setting);
    }
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

  // 图片拖到桌面或者文件夹
  dragStart(filePath: string) {
    ipcRenderer.send(IpcChannel.DRAG_START, filePath);
  }
}
