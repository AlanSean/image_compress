import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ElectronService, ListenerService, ActionsService } from '../core/services';
import { MenuIpcChannel } from '@common/constants';
import { Store, select } from '@ngrx/store';
import { getFilesLength } from '@app/core/core.module';
import { fileExtReg } from '@utils/file';
import { getMenuEnableds } from '@utils/menu';
import { auditTime } from 'rxjs/operators';
import { delay } from '@utils/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  filesLength = 0;
  barShow = true; //进度条是否显示
  dragUp = false; //是否拖入状态

  progress = 100; //压缩进度

  sliderDisabled = false; //滑块是否不可用
  isVisible = false; //控制抽屉

  constructor(
    private actions: ActionsService,
    private ipcListener: ListenerService,
    private electronService: ElectronService,
    private cdr: ChangeDetectorRef,
    protected store: Store
  ) {
    this.electronService.selecteDirResult(this.selecteDirResult);
    this.electronService.updateProgress(this.updateProgress);

    store.pipe(auditTime(16), select(getFilesLength)).subscribe(len => {
      if (len == 0) {
        actions.menuEnabled([MenuIpcChannel.ADD], true);
        actions.menuEnabled(getMenuEnableds(false), false);
      }
      if (len != this.filesLength) {
        this.filesLength = len;
      }
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {
    document.ondragover = function (e) {
      e.preventDefault();
    };
    document.ondrop = function (e) {
      e.preventDefault();
    };
  }

  selecteDirResult = (filePaths: string[], key?: 'SELECT_FILE') => {
    if (key == 'SELECT_FILE') {
      //选择的文件夹或者文件
      this.dragUp = false;
      this.sliderDisabled = false;
      this.actions.fileAdd(filePaths);
      this.cdr.detectChanges();
    }
  };

  /**
   * 添加图片
   * @param e event
   */
  fileAdd(e: DragEvent) {
    if (this.sliderDisabled) return;
    e.preventDefault();
    e.stopPropagation();
    this.dragUp = false;
    this.sliderDisabled = false;
    const files = Array.from((e.dataTransfer as DataTransfer).files)
      .filter(file => !file.type || fileExtReg.test(file.type.toLocaleLowerCase()))
      .map(file => file.path);
    this.actions.fileAdd(files);
  }
  dragenter() {
    if (this.sliderDisabled) return;
    this.dragUp = true;
  }

  dragleave() {
    this.dragUp = false;
    this.sliderDisabled = false;
  }

  dragOver(e: DragEvent) {
    e.preventDefault();
  }

  //更新进度条
  updateProgress = async (progress: number) => {
    await delay(3000);

    if (this.progress === progress) return;
    this.progress = progress;
    if (!this.sliderDisabled) {
      //冻结菜单栏
      this.sliderDisabled = true;
      this.actions.menuEnabled(getMenuEnableds(true), false);
    }
    if (progress == 100) {
      //解除冻结
      this.sliderDisabled = false;
      this.actions.menuEnabled(getMenuEnableds(true), true);
    }
    this.cdr.detectChanges();
  };

  //菜单事件
  menuClick(value: string) {
    this[value] && this[value]();
  }

  //添加文件夹--进行压缩文件夹里面所有图片
  addImgs() {
    if (this.sliderDisabled) return;
    this.actions.select_dir('SELECT_FILE');
  }
  //保存新图片
  savenewdir() {
    this.ipcListener.saveNewDir();
  }
  //清空图片
  cleanImgs() {
    this.electronService.clean();
  }

  //添加文件夹
  openSetting() {
    if (this.sliderDisabled) return;
    this.isVisible = true;
  }

  //关闭抽屉
  close() {
    this.isVisible = false;
  }
}
