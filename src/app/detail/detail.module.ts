import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DetailRoutingModule } from "./detail-routing.module";

import { DetailComponent } from "./detail.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [DetailComponent],
  imports: [CommonModule, SharedModule, DetailRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetailModule {}
