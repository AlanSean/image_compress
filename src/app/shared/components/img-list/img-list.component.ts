import { Component, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FILE } from '@common/constants';
import { selectFile, UPDATE_STATE, REMOVE_FILE } from '@app/core/core.module';
import { ElectronService } from '@app/core/services';
import { NzModalService } from 'ng-zorro-antd/modal';

import { data } from './data';

@Component({
  selector: 'app-img-list',
  templateUrl: './img-list.component.html',
  styleUrls: ['./img-list.component.less']
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImgListComponent implements OnInit {
  isOpen = false;
  files$ = this.store.pipe(select(selectFile));
  files = data;

  @ViewChild('contextmenuEl') contextmenuEl!: ElementRef;
  constructor(
    private electronService: ElectronService,
    private store: Store<Array<FILE>>,
    // private cdr: ChangeDetectorRef,
    private modal: NzModalService
  ) {}
  ngOnInit() {
    this.files$.subscribe(v => {
      // this.cdr.detectChanges();
      console.log(v.length);
    });
  }
  trackByItem(index: number, value: FILE) {
    return index;
  }
  //拖动滑块
  qualityChange(item: FILE, v: number) {
    this.store.dispatch(
      UPDATE_STATE({
        files: {
          ...item,
          quality: `${v}`
        }
      })
    );
  }

  //滑块设置完质量后
  qualityAfterChange(item: FILE, v: number | number[]) {
    const newFileInfo: FILE = {
      ...item,
      state: 'await',
      quality: `${v}`
    };

    this.store.dispatch(
      UPDATE_STATE({
        files: newFileInfo
      })
    );
    this.electronService.file_update_quality(newFileInfo);
  }

  //删除
  remove(key: string): void {
    this.store.dispatch(
      REMOVE_FILE({
        keys: key
      })
    );
  }

  //信息框
  modalInfo(item: FILE): void {
    if (item.state == 'error') {
      this.modal.error({
        nzTitle: 'Image compression failed',
        nzContent: item?.errorInfo?.replace(/error/g, '<br/>error')
      });
    }
  }

  menuListClick(key: string, item: FILE) {
    switch (key) {
      case 'openFileDir':
        item.outpath && this.electronService.openFileDir(item.outpath);
        break;
      case 'saveAs':
        this.electronService.saveAs(item);
        break;
      case 'remove':
        this.store.dispatch(
          REMOVE_FILE({
            keys: item.MD5KEY
          })
        );
        break;
    }
  }
}
