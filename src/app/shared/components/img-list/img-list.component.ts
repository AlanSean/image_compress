import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FILE, nowFILE } from '@common/constants';
import { selectFile, UPDATE_STATE, REMOVE_FILE } from '@app/core/core.module';
import { ElectronService } from '@app/core/services';
import { NzModalService } from 'ng-zorro-antd/modal';
import { animate, style, transition, trigger } from '@angular/animations';

import { data } from './data';

@Component({
  selector: 'app-img-list',
  templateUrl: './img-list.component.html',
  styleUrls: ['./img-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('zoom', [
      transition('void => active', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate(
          '0.2s cubic-bezier(0.08, 0.82, 0.17, 1)',
          style({
            opacity: 1,
            transform: 'scale(1)'
          })
        )
      ]),
      transition('active => void', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate(
          '0.1s cubic-bezier(0.78, 0.14, 0.15, 0.86)',
          style({
            opacity: 0,
            transform: 'scale(0.8)'
          })
        )
      ])
    ])
  ]
})
export class ImgListComponent {
  isOpen = false;
  files$ = this.store.pipe(select(selectFile));
  files = data;

  @ViewChild('contextmenuEl') contextmenuEl!: ElementRef;
  constructor(
    private electronService: ElectronService,
    private store: Store<Array<FILE>>,
    private cdr: ChangeDetectorRef,
    private modal: NzModalService
  ) {
    console.log(this.files);
  }

  trackByItem(index: number, value: nowFILE) {
    return value.state;
  }

  //拖动滑块
  qualityChange(item: nowFILE, v: number) {
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
  qualityAfterChange(item: nowFILE, v: number) {
    const newFileInfo: nowFILE = {
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
  modalInfo(item: nowFILE): void {
    // console.log("showItemInFolder", item.path);
    // this.electronService.showItemInFolder(item.path);
    if (item.state == 'error') {
      this.modal.error({
        nzTitle: 'Image compression failed',
        nzContent: item?.errorInfo?.replace(/error/g, '<br/>error')
      });
    }
  }

  menuListClick(key: string, item: nowFILE) {
    if (key == 'openFileDir') {
      this.electronService.openFileDir(item.outsrc);
    }
  }
}
