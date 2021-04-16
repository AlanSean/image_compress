import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from "../shared/shared.module";
import { NzProgressModule } from "ng-zorro-antd/progress";
import { NzSliderModule } from "ng-zorro-antd/slider";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { NzButtonModule } from "ng-zorro-antd/button";



describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule,
        SharedModule,
        NzProgressModule,
        NzSliderModule,
        NzInputModule,
        NzGridModule,
        NzMenuModule,
        NzDrawerModule,
        NzButtonModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a div tag', waitForAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector(".text-big").textContent).toContain(
      "拖拽文件到此区域"
    );
  }));
});
