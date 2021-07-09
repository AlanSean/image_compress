import { Component, ViewChild, ElementRef, ChangeDetectorRef, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FILE } from '@common/constants';
import { selectFile } from '@app/core/core.module';
import { ElectronService, ListenerService, ActionsService } from '@app/core/services';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Subscription } from 'rxjs';
import { auditTime } from 'rxjs/operators';

@Component({
  selector: 'app-img-list',
  templateUrl: './img-list.component.html',
  styleUrls: ['./img-list.component.less']
})
export class ImgListComponent implements OnInit {
  isOpen = false;
  files$: Observable<readonly FILE[]>;
  files: readonly FILE[] = [];
  subs!: Subscription;
  @ViewChild('contextmenuEl') contextmenuEl!: ElementRef;
  constructor(
    protected store: Store,
    private electronService: ElectronService,
    private ipcListener: ListenerService,
    private actions: ActionsService,
    private cdr: ChangeDetectorRef,
    private modal: NzModalService
  ) {
    this.files$ = store.pipe(auditTime(16), select(selectFile));
  }
  ngOnInit() {
    let i = 0;
    this.subs = this.files$.subscribe(v => {
      this.files = v;
      console.log('files$', new Date(), v);
      this.cdr.markForCheck();
      this.cdr.detectChanges();
      console.log(i++);
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
    this.ipcListener.update({
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
    this.ipcListener.update(newItem);
    this.actions.file_update_quality(newItem);
  }

  //信息框
  modalInfo(item: FILE) {
    if (item.state == 'error' && item.errorInfo) {
      this.modal.error({
        nzAutofocus: null,
        nzCentered: true,
        nzTitle: 'Image compression failed',
        nzContent: item.errorInfo.replace(/error/g, '<br/>error')
      });
    }
  }

  menuListClick(key: string, item: FILE) {
    switch (key) {
      case 'openFileDir':
        item.outpath && this.electronService.openFileDir(item.outpath);
        break;
      case 'saveAs':
        this.actions.saveAs(item);
        break;
      case 'remove':
        this.ipcListener.remove(item.MD5KEY);
        break;
    }
  }
}
