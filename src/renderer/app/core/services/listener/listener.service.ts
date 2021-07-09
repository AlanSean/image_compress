import { ipcRenderer } from 'electron';
import { ApplicationRef, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CLEAR_FILE, FILE_ADD, SAVE_NEW_DIR, UPDATE_STATE, REMOVE_FILE } from '@app/core/files/files.actions';
import { FILE, messageType } from '@common/constants';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ListenerService {
  constructor(private cdr: ApplicationRef, private message: NzMessageService, private translate: TranslateService, private store: Store) {}

  add = (FILE: FILE | Array<FILE>) => {
    this.store.dispatch(
      FILE_ADD({
        files: FILE
      })
    );
  };

  update = (FILE: FILE | FILE[]) => {
    this.store.dispatch(
      UPDATE_STATE({
        files: FILE
      })
    );
  };

  //导出到新文件夹
  saveNewDir = () => {
    this.store.dispatch(
      SAVE_NEW_DIR({
        ipcRenderer: ipcRenderer
      })
    );
    this.cdr.tick();
  };

  cleanFile = () => {
    this.store.dispatch(CLEAR_FILE());
  };

  remove = (key: string) => {
    this.store.dispatch(
      REMOVE_FILE({
        keys: key
      })
    );
  };

  toast = (type: messageType, message: string, options?: number) => {
    this.message.remove();
    this.message[type](message && this.translate.instant(message, options));
    this.cdr.tick();
  };
}
