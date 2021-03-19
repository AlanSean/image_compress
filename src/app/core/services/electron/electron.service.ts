import { Injectable, Input } from "@angular/core";

import { Store } from "@ngrx/store";
// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote } from "electron";
import * as childProcess from "child_process";
import * as fs from "fs-extra";
import { IpcChannel } from "@common/constants";
import { FILE_ADD } from "../../state/files";
import { FILE } from "@common/constants";
import { UPDATE_PROGRESS } from "@app/core/state/progress";
@Injectable({
  providedIn: "root",
})
export class ElectronService {
  @Input() files: string[] = [];
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor(private store: Store) {
    this.ipcRenderer = window.require("electron").ipcRenderer;
    this.webFrame = window.require("electron").webFrame;
    this.childProcess = window.require("child_process");
    this.ipcRendererOn();
    this.ipcRenderer.send('close-loading-window',{
      isClose:true
    });
  }
  //向主进程发送 file_add命令
  fileAdd(files: string[]): void {
    this.ipcRenderer.send(IpcChannel.FILE_ADD, files);
  }
  //开启监听主进程向子进程发送的命令
  ipcRendererOn(): void {
    this.ipcRenderer.on(IpcChannel.FILE_SELECTED, (_, FILE:FILE | Array<FILE>) => {
      console.log(FILE);
      this.store.dispatch(
        FILE_ADD({
          files: FILE,
        })
      );
    });
    this.ipcRenderer.on(IpcChannel.PROGRESS, (_, current:number,sum:number) => {
      this.store.dispatch(
        UPDATE_PROGRESS({
          newProgress: current/sum*100,
        })
      );
    });
  }
}
