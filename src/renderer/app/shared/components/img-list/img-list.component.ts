import { Component, ViewChild, ElementRef, ChangeDetectorRef, OnInit } from '@angular/core';
import { FILE } from '@common/constants';
import { ElectronService, ActionsService, FilesService } from '@app/core/services';
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
    private electronService: ElectronService,
    private filesService: FilesService,
    private actions: ActionsService,
    private cdr: ChangeDetectorRef,
    private modal: NzModalService
  ) {
    this.files$ = this.filesService.getFiles().pipe(auditTime(16));
  }
  ngOnInit() {
    this.subs = this.files$.subscribe(newFiles => {
      this.files = newFiles;
      // this.cdr.markForCheck();
      // this.cdr.detectChanges();
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
    this.filesService.update({
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
    this.filesService.update(newItem);
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
        this.filesService.remove(item);
        break;
    }
  }
}
