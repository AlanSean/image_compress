import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { Router } from "@angular/router";
import { ElectronService } from "../core/services";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  @Input() files: string[] = [];

  constructor(
    private router: Router,
    private electronService: ElectronService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    document.ondragover = function (e) {
      e.preventDefault();
    };
    document.ondrop = function (e) {
      e.preventDefault();
    };

    this.electronService.ipcRenderer.on("file_selected", (event, filepath) => {
      filepath.forEach((path: string) => {
        path = `file://${path}`;
        !this.files.includes(path) && this.files.push(path);
      });
      console.log(this.files);
      this.ref.markForCheck(); // 进行标注
      this.ref.detectChanges(); // 要多加一行这个 执行一次变化检测
    });
  }

  onDrop(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files)
      .filter((file) => !file.type || /png|jpeg/.test(file.type))
      .map((file) => file.path);
    this.electronService.ipcRenderer.send("onDrop", files);
  }
}
