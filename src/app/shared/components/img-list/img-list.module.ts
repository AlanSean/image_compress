import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";
import { CoreModule } from "@app/core/core.module";
import { ImgListComponent } from "./img-list.component";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { NzSliderModule } from "ng-zorro-antd/slider";
import { NzModalModule } from "ng-zorro-antd/modal";
@NgModule({
  declarations: [ImgListComponent],
  imports: [
    CoreModule,
    CommonModule,
    TranslateModule,
    FormsModule,
    NzSliderModule,
    NzSpinModule,
    NzModalModule,
  ],
  exports: [ImgListComponent],
})
export class ImgListModule {}
