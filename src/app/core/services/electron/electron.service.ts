import { Injectable, Input } from "@angular/core";

import { Store } from "@ngrx/store";
// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote } from "electron";
import * as childProcess from "child_process";
import * as fs from "fs-extra";
import { IpcChannel } from "@common/constants";
import { FILE_ADD,UPDATE_STATE } from "../../state/files";
import { resolve } from "path";
import { compress } from "@utils/index";
const outdir = "C:/Users/111/Desktop/image_compress/";
const regDir = /.+\\(.+)/;
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
    this.fileSelected();
  }
  //向主进程发送 file_add命令
  fileAdd(files: string[]): void {
    this.ipcRenderer.send(IpcChannel.FILE_ADD, files);
  }
  //开启监听主进程向子进程发送的文件选择命令
  fileSelected(): void {
    this.ipcRenderer.on(IpcChannel.FILE_SELECTED, (_, filepath) => {
      this.dirSearchImg(filepath);
    });
  }
  /**
   * 搜索文件夹下的图片
   * @param filepath
   */
  async dirSearchImg(filepath: string[],out:string=outdir): Promise<any> {
    
    for (const file of filepath) {
      try {
        //验证是否存在
        const imgFile = await fs.stat(file);
        //判断是否是文件以及格式是否是图片
        if (imgFile.isFile() && /png|jpeg|jpg/.test(file)) {

          const FILE = {
            path: file.replace(/\\/g, "/"),
            outpath: `${out}${regDir.exec(file)[1]}`,
            state: 'run'
          };

          this.store.dispatch(
            FILE_ADD({
              files: FILE,
            })
          );
          compress(FILE.path,out).then(() => {
            console.log(`图片${file}压缩完成!`);
            console.log('outpath',out);
            this.store.dispatch(
              UPDATE_STATE({
                file: {
                  ...FILE,
                  state: 'complete'
                },
              })
            );
          });
          //如果是文件 后面的逻辑不需要执行了
          continue;
        }
        //判断是不是文件夹
        if (imgFile.isDirectory()) {
          //获取文件夹下的文件列表名
          const fileNames = await fs.readdir(file),
            //地址拼接
            dirFiles = fileNames.map((filename) => resolve(file, filename));
          //回调继续查找 直到没有文件夹
          this.dirSearchImg(dirFiles,`${out}${regDir.exec(file)[1]}/`);
        }
      } catch (e) {
        console.error(`Failed to access file ${file}`,e);
      }
    }
  }
}
