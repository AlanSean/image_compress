import { Injectable, Input } from "@angular/core";

import { Store } from "@ngrx/store";
// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote } from "electron";
import * as childProcess from "child_process";
import * as fs from "fs";
import * as imagemin from "imagemin";
import { IpcChannel } from "@common/constants";
import { FILE_ADD }  from '../../state/files';
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
  imagemin: typeof imagemin;
  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }
  

  constructor(private store: Store) {
    // Conditional imports
    this.ipcRenderer = window.require("electron").ipcRenderer;
    this.webFrame = window.require("electron").webFrame;

    // If you wan to use remote object, pleanse set enableRemoteModule to true in main.ts
    // this.remote = window.require('electron').remote;

    this.childProcess = window.require("child_process");
    this.fs = window.require("fs");
    this.imagemin = window.require("imagemin");

    this.fileSelected();
  }
  fileAdd(files: string[]): void {
    this.ipcRenderer.send(IpcChannel.FILE_ADD, files);
  }
  fileSelected(): void{
    this.ipcRenderer.on(IpcChannel.FILE_SELECTED, (_, filepath) => {
      this.store.dispatch(FILE_ADD({
        files:filepath
      }));
    });
  }
}
