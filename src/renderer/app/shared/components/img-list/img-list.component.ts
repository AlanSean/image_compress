import { Component, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FILE } from '@common/constants';
import { selectFile } from '@app/core/core.module';
import { ElectronService } from '@app/core/services';
import { NzModalService } from 'ng-zorro-antd/modal';
import { throttleTime } from 'rxjs/operators';
// import { data } from './data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-img-list',
  templateUrl: './img-list.component.html',
  styleUrls: ['./img-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImgListComponent implements OnInit {
  isOpen = false;
  files$ = this.store.pipe(throttleTime(16), select(selectFile));
  files: readonly FILE[] = [];
  //删除
  remove = this.electronService.remove;
  subs!: Subscription;
  @ViewChild('contextmenuEl') contextmenuEl!: ElementRef;
  constructor(
    private electronService: ElectronService,
    private store: Store<Array<FILE>>,
    private cdr: ChangeDetectorRef,
    private modal: NzModalService
  ) {}
  ngOnInit() {
    this.subs = this.files$.subscribe(v => {
      this.files = v;
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    });
  }
  ngOnDestory() {
    this.subs.unsubscribe();
  }
  trackByItem(index: number) {
    return index;
  }
  //拖动滑块
  qualityChange(item: FILE, v: number) {
    this.electronService.update('_', {
      ...item,
      quality: `${v}`
    });
  }

  //滑块设置完质量后
  qualityAfterChange(item: FILE, v: number | number[]) {
    const newItem: FILE = {
      ...item,
      state: 'await',
      quality: `${v as number}`
    };
    this.electronService.update('_', newItem);
    this.electronService.file_update_quality(newItem);
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
        this.remove(item.MD5KEY);
        break;
    }
  }
}
