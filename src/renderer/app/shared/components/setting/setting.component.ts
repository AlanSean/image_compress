import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Input,
  SimpleChanges,
  EventEmitter,
  Output,
  OnChanges
} from '@angular/core';
import { ElectronService } from '@app/core/services';
import { IpcChannel } from '@common/constants';
import { getSetting, setSetting } from '@utils/storage';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingComponent implements OnInit, OnChanges {
  @Input() sliderDisabled = false; //--------------------是否冻结滑块
  @Input() isVisible = false; //-------------------------控制抽屉
  @Output() nzOnClose = new EventEmitter<string>();
  @ViewChild('outdirEl') outdirEl!: ElementRef; //--------outdirDom

  pngQuality = getSetting().pngQuality; //---------------滑块唯一值
  jpgQuality = getSetting().jpgQuality; //---------------滑块唯一值
  webpQuality = getSetting().webpQuality; //-------------滑块唯一值
  outdir = getSetting().outdir as string; //-----------------------输出目录

  constructor(private electronService: ElectronService, private cdr: ChangeDetectorRef) {
    this.ipcRendererOn();
  }

  ngOnInit(): void {}

  //父传入的属性发生变化时
  ngOnChanges(changes: SimpleChanges) {
    const isVisible = changes['isVisible'];
    if (isVisible && isVisible.currentValue && this.outdirEl) {
      this.outdirEl.nativeElement.scrollLeft = 1000000;
    }
  }

  //开启监听主进程向子进程发送的命令
  ipcRendererOn(): void {
    //添加按钮
    this.electronService.ipcRenderer.on(IpcChannel.SELECTED_DIR_RESULT, (_, filePaths: string[], key?: 'SELECT_FILE') => {
      if (!key) {
        //把存储的照片导出到新目录
        setSetting({
          outdir: filePaths[0]
        });
        this.outdir = filePaths[0];
        this.outdirEl.nativeElement.scrollLeft = 1000000;
        this.cdr.detectChanges();
      }
    });
  }

  // 质量设置
  qualityChange(key: string, value: number | number[]): void {
    setSetting({
      [key]: value + ''
    });
  }

  //打开文件夹
  openDir(): void {
    this.electronService.showItemInFolder(this.outdir);
  }

  //修改输出目录
  setOutdir(): void {
    this.electronService.select_dir();
  }

  //关闭抽屉
  close(): void {
    this.isVisible = false;
  }
}
