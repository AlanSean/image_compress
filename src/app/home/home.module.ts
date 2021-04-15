import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { SharedModule } from "../shared/shared.module";
import { NzProgressModule } from "ng-zorro-antd/progress";
import { NzSliderModule } from "ng-zorro-antd/slider";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { NzButtonModule } from "ng-zorro-antd/button";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    NzProgressModule,
    NzSliderModule,
    NzInputModule,
    NzGridModule,
    NzMenuModule,
    NzDrawerModule,
    NzButtonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
