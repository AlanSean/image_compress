import { ipcRenderer } from 'electron';

import { Injectable } from '@angular/core';
import { FILE, IpcChannel } from '@common/constants';
import { BehaviorSubject } from 'rxjs';
import { _deepCopy, _indexOfPre, _push, _update, _remove } from './files.utils';

type N = 'push' | 'update' | 'remove';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private filesBSubject = new BehaviorSubject<FILE[]>([]);
  private lenBSubject = new BehaviorSubject<number>(0);

  private _pipeArr(files: FILE[], n?: N) {
    const oldFiles = this.filesBSubject.getValue();
    let fileArr: FILE[] = _deepCopy(oldFiles);
    const _indexOf = _indexOfPre(fileArr);

    for (const file of files) {
      const findIndex = _indexOf(file.MD5KEY);

      if (findIndex === -1) {
        if (n === 'push') {
          fileArr = _push(fileArr, file);
          continue;
        }
      } else {
        if (n === 'remove') {
          fileArr = _remove(fileArr, findIndex);
          continue;
        }
        if (n === 'update') {
          fileArr = _update(fileArr, findIndex, file);
          continue;
        }
      }
    }
    return fileArr;
  }

  private _pipe(files: FILE | FILE[], n?: N) {
    return Array.isArray(files) ? this._pipeArr(files, n) : this._pipeArr([files], n);
  }

  push = (files: FILE | FILE[]) => {
    const fileArr = this._pipe(files, 'push');

    this.next(fileArr);
  };

  update = (files: FILE | FILE[]) => {
    const fileArr = this._pipe(files, 'update');

    this.next(fileArr);
  };
  remove = (files: FILE | FILE[]) => {
    const fileArr = this._pipe(files, 'remove');

    this.next(fileArr);
  };
  clear = () => {
    this.next([]);
  };

  saveNewDir = () => {
    const files = this.filesBSubject.getValue();

    const fileArr = [];

    for (let i = 0; i < files.length; i++) {
      const { outpath, outdir } = files[i];

      fileArr[i] = {
        outpath,
        outdir
      };
    }

    ipcRenderer.send(IpcChannel.SAVE_NEW_DIR, fileArr);
  };

  getFiles = () => {
    return this.filesBSubject.asObservable();
  };
  getLen = () => {
    return this.lenBSubject.asObservable();
  };

  private next(files: FILE[]) {
    this.filesBSubject.next(files);
    this.lenBSubject.next(files.length);
  }
}
