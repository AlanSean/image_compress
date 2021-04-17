import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";
import { SettingComponent } from "./setting.component";
import { NzSliderModule } from "ng-zorro-antd/slider";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { NzButtonModule } from "ng-zorro-antd/button";

@NgModule({
  declarations: [SettingComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    NzSliderModule,
    NzGridModule,
    NzDrawerModule,
    NzButtonModule,
  ],
  exports: [SettingComponent],
})
export class SettingModule {}
