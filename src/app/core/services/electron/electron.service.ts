import { ApplicationRef, Injectable, Input } from '@angular/core';

import { Store } from '@ngrx/store';
// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, shell } from 'electron';

import * as childProcess from 'child_process';
import * as fs from 'fs-extra';
import * as path from 'path';
import { getMenuEnableds, IpcChannel, MenuIpcChannel, Message, messageType } from '@common/constants';
import { getSetting, mkOutdir } from '@utils/storage';
import { FILE_ADD, SAVE_NEW_DIR, UPDATE_STATE } from '@app/core/core.module';
import { FILE } from '@common/constants';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CLEAR_FILE } from '@app/core/files/files.actions';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  @Input() files: string[] = [];
  ipcRenderer = ipcRenderer;
  webFrame = webFrame;
  shell = shell;
  childProcess = childProcess;
  path = path;
  constructor(private cdr: ApplicationRef, private store: Store, private message: NzMessageService, private translate: TranslateService) {
    this.ipcRendererOn();
  }
  //向主进程发送 file_add命令
  fileAdd(files: string[]): void {
    this.ipcRenderer.send(IpcChannel.FILE_ADD, files, getSetting());
  }
  //选择文件
  select_dir(key?: string): void {
    this.ipcRenderer.send(IpcChannel.SELECT_DIR, key);
  }
  //打开默认输出目录
  async showItemInFolder(outdir: string): Promise<void> {
    const dirPath = path.resolve(outdir);
    try {
      console.log('openDir:', dirPath);
      await fs.stat(dirPath);
      this.shell.showItemInFolder(dirPath);
    } catch (e) {
      await mkOutdir(dirPath);
      this.shell.showItemInFolder(dirPath);
    }
  }
  //另存为
  saveAs(item: FILE) {
    this.ipcRenderer.send(IpcChannel.SAVE_AS, item);
  }
  //导出到新文件夹
  savenewdir() {
    this.store.dispatch(
      SAVE_NEW_DIR({
        ipcRenderer: this.ipcRenderer
      })
    );
  }

  //清空文件夹

  clean() {
    this.store.dispatch(CLEAR_FILE());
    this.menuEnabled([MenuIpcChannel.ADD], true);
    this.menuEnabled(getMenuEnableds(false), false);
  }

  //更新menu 状态
  menuEnabled(keys: MenuIpcChannel[], enabled: boolean) {
    this.ipcRenderer.send(MenuIpcChannel.Enabled, keys, enabled);
  }

  //打开默认输出目录
  async openFileDir(filepath: string): Promise<void> {
    const filePath = path.resolve(filepath);
    try {
      console.log('openFileDir:', filePath);
      await fs.stat(filePath);
      this.shell.showItemInFolder(filePath);
    } catch (e) {
      //文件不存在
      console.log(e);
    }
  }

  //向主进程发送 file_update_quality指令 进行按新质量压缩
  file_update_quality(file: FILE): void {
    this.ipcRenderer.send(IpcChannel.FILE_UPDATE_QUALITY, file);
  }

  //开启监听主进程向子进程发送的命令
  ipcRendererOn(): void {
    //压缩完成的文件
    this.ipcRenderer.on(IpcChannel.FILE_SELECTED, (_, FILE: FILE | Array<FILE>) => {
      this.store.dispatch(
        FILE_ADD({
          files: FILE
        })
      );
      this.cdr.tick();
    });

    //更新图片信息
    this.ipcRenderer.on(IpcChannel.FILE_UPDATE, (_, FILE: FILE | FILE[]) => {
      this.store.dispatch(
        UPDATE_STATE({
          files: FILE
        })
      );
      this.cdr.tick();
    });

    //窗口菜单 发起的选择文件
    this.ipcRenderer.on(IpcChannel.SELECT_DIR, (_, key: string) => {
      this.select_dir(key);
    });

    //窗口菜单 发起的选择文件
    this.ipcRenderer.on(IpcChannel.OPEN_DIR, () => {
      const outdir = getSetting().outdir as string;
      this.openFileDir(outdir);
    });

    //另存为事件
    this.ipcRenderer.on(IpcChannel.SAVE_NEW_DIR, () => {
      this.savenewdir();
      this.cdr.tick();
    });
    //清空事件
    this.ipcRenderer.on(IpcChannel.CLEAN_FILE, () => {
      this.clean();
      this.cdr.tick();
    });

    //消息
    this.ipcRenderer.on(Message.TOAST, (_, type: messageType, message: string) => {
      this.message[type](this.translate.instant(message));
      this.cdr.tick();
    });
  }
}
