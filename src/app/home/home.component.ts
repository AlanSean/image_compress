import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { Store, select } from "@ngrx/store";
import { ElectronService } from "../core/services";
import { selectFile } from "../core/state/files";
import { FILE } from "@common/constants";
import { getSetting } from "@utils/index";


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  barShow = true;
  dragUp = false;
  outdir = getSetting().outdir;
  files$ = this.store.pipe(select(selectFile));
  progress = 100;
  constructor(
    private electronService: ElectronService,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    //进度
    this.electronService.ipcRenderer.on(
      'PROGRESS',
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
    const files = Array.from(e.dataTransfer.files)
      .filter((file) => !file.type || /png|jpeg/.test(file.type))
      .map((file) => file.path);
    this.electronService.fileAdd(files,this.outdir);
  }
  /**
   * 打开文件夹
   */
  openDirectory(): void {
    console.log('openDirectory');
    this.electronService.showItemInFolder(this.outdir);
  }

  dragenter(): void {
    this.dragUp = true;
  }

  dragleave(): void {
    this.dragUp = false;
  }

  dragOver(e: DragEvent): void {
    e.preventDefault();
  }
  trackByItems(index: number, item: FILE): string {
    return item.src;
  }
  updateProgress(progress:number): void {
    this.progress = progress;
    this.cdr.detectChanges();
  }
}
