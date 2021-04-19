import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TranslateModule } from "@ngx-translate/core";

import {
  PageNotFoundComponent,
  IconComponent,
  SettingModule,
  ImgListModule
} from "./components/";
import { WebviewDirective } from "./directives/";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, IconComponent],
  exports: [
    CommonModule,
    TranslateModule,
    WebviewDirective,
    FormsModule,
    IconComponent,
    SettingModule,
    ImgListModule
  ],
})
export class SharedModule {}
