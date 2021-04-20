import { Injectable, Input } from "@angular/core";

import { Store } from "@ngrx/store";
// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote, shell, dialog } from "electron";
import * as childProcess from "child_process";
import * as fs from "fs-extra";
import { IpcChannel } from "@common/constants";
import { getSetting, mkOutdir } from "@utils/storage";
import { FILE_ADD, UPDATE_STATE } from "@app/core/core.module";
import { FILE } from "@common/constants";

@Injectable({
  providedIn: "root",
})
export class ElectronService {
  @Input() files: string[] = [];
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  shell: typeof shell;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  dialog: typeof dialog;
  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor(private store: Store) {
    const electron = window.require("electron");
    this.ipcRenderer = electron.ipcRenderer;
    this.webFrame = electron.webFrame;
    this.shell = electron.shell;
    this.childProcess = window.require("child_process");
    this.ipcRendererOn();
    this.ipcRenderer.send("close-loading-window", {
      isClose: true,
    });
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
    try {
      console.log("openDir:", outdir);
      await fs.stat(outdir);
      this.shell.showItemInFolder(outdir);
    } catch (e) {
      await mkOutdir(outdir);
      this.shell.showItemInFolder(outdir);
    }
  }

  //向主进程发送 file_update_quality指令 进行按新质量压缩
  file_update_quality(file: FILE): void {
    this.ipcRenderer.send(IpcChannel.FILE_UPDATE_QUALITY, file);
  }

  //开启监听主进程向子进程发送的命令
  ipcRendererOn(): void {
    //压缩完成的文件
    this.ipcRenderer.on(
      IpcChannel.FILE_SELECTED,
      (_, FILE: FILE | Array<FILE>) => {
        this.store.dispatch(
          FILE_ADD({
            files: FILE,
          })
        );
      }
    );

    //更新图片信息
    this.ipcRenderer.on(IpcChannel.FILE_UPDATE, (_, FILE: FILE | FILE[]) => {
      this.store.dispatch(
        UPDATE_STATE({
          files: FILE
        })
      );
    });
  }
}
