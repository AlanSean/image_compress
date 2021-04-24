import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ElectronService } from '../core/services';
import { IpcChannel } from '@common/constants';
import { Store, select } from '@ngrx/store';
import { getFilesLength } from '@app/core/core.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  [key: string]: any;
  filesLength$ = this.store.pipe(select(getFilesLength));
  barShow = true; //进度条是否显示
  dragUp = false; //是否拖入状态

  progress = 100; //压缩进度

  sliderDisabled = false; //滑块是否不可用
  isVisible = false; //控制抽屉

  constructor(private electronService: ElectronService, private cdr: ChangeDetectorRef, private store: Store) {
    this.ipcRendererOn();
  }

  ngOnInit(): void {
    document.ondragover = function (e) {
      e.preventDefault();
    };
    document.ondrop = function (e) {
      e.preventDefault();
    };
  }
  //开启监听主进程向子进程发送的命令
  ipcRendererOn(): void {
    //添加按钮
    this.electronService.ipcRenderer.on(IpcChannel.SELECTED_DIR_RESULT, (_, filePaths: string[], key?: 'SELECT_FILE') => {
      if (key) {
        //选择的文件夹或者文件
        this.dragUp = false;
        this.sliderDisabled = false;
        this.electronService.fileAdd(filePaths);
        this.cdr.detectChanges();
      }
    });
    //进度
    this.electronService.ipcRenderer.on('PROGRESS', (_, current: number, sum: number) => {
      this.updateProgress((current / sum) * 100);
    });
  }
  /**
   * 添加图片
   * @param e event
   */
  fileAdd(e: DragEvent): void {
    if (this.sliderDisabled) return;
    e.preventDefault();
    e.stopPropagation();
    this.dragUp = false;
    this.sliderDisabled = false;
    const files = Array.from((e.dataTransfer as DataTransfer).files)
      .filter(file => !file.type || /jpg|png|jpeg/.test(file.type.toLocaleLowerCase()))
      .map(file => file.path);
    this.electronService.fileAdd(files);
  }
  dragenter(): void {
    if (this.sliderDisabled) return;
    this.dragUp = true;
  }

  dragleave(): void {
    this.dragUp = false;
    this.sliderDisabled = false;
  }

  dragOver(e: DragEvent): void {
    e.preventDefault();
  }

  //更新进度条
  updateProgress(progress: number): void {
    this.progress = progress;
    if (!this.sliderDisabled) this.sliderDisabled = true;
    if (progress == 100) this.sliderDisabled = false;
    this.cdr.detectChanges();
  }

  //菜单事件
  menuClick(value: string): void {
    this[value] && this[value]();
  }

  //添加文件夹--进行压缩文件夹里面所有图片
  addImgs(): void {
    if (this.sliderDisabled) return;
    this.electronService.select_dir('SELECT_FILE');
  }

  //保存并覆盖
  save(): void {}

  //保存并覆盖
  saveOverwrite(): void {}

  //保存新图片
  savenewdir(): void {}

  //清空图片
  cleanImgs(): void {}

  //添加文件夹
  openSetting(): void {
    if (this.sliderDisabled) return;
    this.isVisible = true;
  }

  //关闭抽屉
  close(): void {
    this.isVisible = false;
  }
}
