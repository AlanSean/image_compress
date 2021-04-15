import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ElectronService } from "../core/services";
import { getSetting, setSetting } from "@utils/index";
import { IpcChannel } from "@common/constants";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  files = [];
  barShow = true; //进度条是否显示
  dragUp = false; //是否拖入状态
  outdir = getSetting().outdir; //输出目录
  progress = 100; //压缩进度
  pngSingleValue = getSetting().pngQuality; //滑块唯一值
  jpgSingleValue = getSetting().jpgQuality; //滑块唯一值
  webpSingleValue = getSetting().webpQuality; //滑块唯一值
  sliderDisabled = false; //滑块是否不可用
  isVisible = true; //控制抽屉
  @ViewChild("outdirEl") outdirEl: ElementRef;
  constructor(
    private electronService: ElectronService,
    private cdr: ChangeDetectorRef
  ) {
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
    this.electronService.ipcRenderer.on(
      IpcChannel.SELECTED_DIR_RESULT,
      (_, filePaths: string[], key?: "SELECT_FILE") => {
        if (key) {
          //选择的文件夹或者文件
          console.log("filePaths:", filePaths);
          this.dragUp = false;
          this.sliderDisabled = false;
          this.electronService.fileAdd(filePaths);
        } else {
          //把存储的照片导出到新目录
          setSetting({
            outdir: filePaths[0],
          });
          this.outdir = filePaths[0];
          this.outdirEl.nativeElement.scrollLeft = 1000000;
        }
        this.cdr.detectChanges();
      }
    );
    //进度
    this.electronService.ipcRenderer.on(
      "PROGRESS",
      (_, current: number, sum: number) => {
        this.updateProgress((current / sum) * 100);
      }
    );
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
    const files = Array.from(e.dataTransfer.files)
      .filter(
        (file) =>
          !file.type || /jpg|png|jpeg/.test(file.type.toLocaleLowerCase())
      )
      .map((file) => file.path);
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
  // 质量设置
  qualityChange(key:string,value: string): void {
    setSetting({
      [key]: value + "",
    });
  }

  menuClick(value: string): void {
    this[value] && this[value]();
  }
  //添加文件夹
  addImgs(): void {
    this.electronService.select_dir("SELECT_FILE");
  }
  //保存并覆盖
  save(): void {}
  //添加文件夹
  saveOverwrite(): void {}
  //添加文件夹
  savenewdir(): void {}
  //添加文件夹
  cleanImgs(): void {}
  //添加文件夹
  openSetting(): void {
    this.isVisible = true;
    this.outdirEl.nativeElement.scrollLeft = 1000000;
  }
  //打开文件夹
  openDir(): void {
    console.log("openDirectory");
    this.electronService.showItemInFolder(this.outdir);
  }
  //关闭抽屉
  close(): void {
    console.log("Button ok clicked!");
    this.isVisible = false;
  }
  //修改输出目录
  setOutdir(): void {
    this.electronService.select_dir();
  }
}
