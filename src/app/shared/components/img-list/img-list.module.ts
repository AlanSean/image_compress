import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";
import { ImgListComponent } from "./img-list.component";
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSliderModule } from "ng-zorro-antd/slider";

@NgModule({
  declarations: [ImgListComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    NzSliderModule,
    NzSpinModule
  ],
  exports: [ImgListComponent],
})
export class ImgListModule {}
