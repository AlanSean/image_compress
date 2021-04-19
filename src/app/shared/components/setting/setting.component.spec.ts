import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ElectronService } from "../../../core/services";

import { SettingComponent } from "./setting.component";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";
import { NzSliderModule } from "ng-zorro-antd/slider";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { NzButtonModule } from "ng-zorro-antd/button";
import { CoreModule } from "../../../core/core.module";

describe("SettingComponent", () => {
  let component: SettingComponent;
  let fixture: ComponentFixture<SettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingComponent],
      imports: [
        CoreModule,
        TranslateModule.forRoot(),
        CommonModule,
        FormsModule,
        NzSliderModule,
        NzGridModule,
        NzDrawerModule,
        NzButtonModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
