import { NgModule } from "@angular/core";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { SharedModule } from "../shared/shared.module";
import { NzProgressModule } from "ng-zorro-antd/progress";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzMenuModule } from "ng-zorro-antd/menu";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    HomeRoutingModule,
    NzProgressModule,
    NzInputModule,
    NzMenuModule,
  ],
})
export class HomeModule {}
