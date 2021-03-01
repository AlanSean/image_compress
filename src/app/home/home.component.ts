import {
  Component,
  OnInit,
} from "@angular/core";
import { Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { ElectronService } from "../core/services";
import { selectFile } from "../core/state/files";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  files$ = this.store.pipe(select(selectFile));
  constructor(
    private router: Router,
    private electronService: ElectronService,
    private store: Store
  ) {}

  ngOnInit(): void {
    document.ondragover = function (e) {
      e.preventDefault();
    };
    document.ondrop = function (e) {
      e.preventDefault();
    };
  }

  fileAdd(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files)
      .filter((file) => !file.type || /png|jpeg/.test(file.type))
      .map((file) => file.path);
    this.electronService.fileAdd(files);
  }
}
