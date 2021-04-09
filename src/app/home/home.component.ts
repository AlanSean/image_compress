import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { ElectronService } from "../core/services";
import { getSetting, setSetting } from "@utils/index";


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  barShow = true; //进度条是否显示
  dragUp = false; //是否拖入状态
  outdir = getSetting().outdir; //输出目录
  progress = 100; //压缩进度
  singleValue = getSetting().quality; //滑块唯一值
  sliderDisabled = false; //滑块是否不可用
  constructor(
    private electronService: ElectronService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    //进度
    this.electronService.ipcRenderer.on(
      "PROGRESS",
      (_, current: number, sum: number) => {
        this.updateProgress((current / sum) * 100);
      }
    );
    document.ondragover = function (e) {
      e.preventDefault();
    };
    document.ondrop = function (e) {
      e.preventDefault();
    };
  }

  /**
   * 添加图片
   * @param e event
   */
  fileAdd(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.dragUp = false;
    this.sliderDisabled = false;
    const files = Array.from(e.dataTransfer.files)
      .filter((file) => !file.type || /png|jpeg/.test(file.type))
      .map((file) => file.path);
    this.electronService.fileAdd(files);
  }
  /**
   * 打开文件夹
   */
  openDirectory(): void {
    console.log("openDirectory");
    this.electronService.showItemInFolder(this.outdir);
  }

  dragenter(): void {
    this.dragUp = true;
    this.sliderDisabled = true;
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
  qualityChange(value: string): void {
    setSetting({
      quality: value+''
    });
  }
}
