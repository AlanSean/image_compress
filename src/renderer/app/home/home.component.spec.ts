import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HomeComponent],
        imports: [
          TranslateModule.forRoot(),
          RouterTestingModule,
          SharedModule,
          NzProgressModule,
          NzInputModule,
          NzMenuModule,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it(
  //   'should render title in a span tag',
  //   waitForAsync(() => {
  //     const compiled = fixture.debugElement.nativeElement;
  //     expect(compiled.querySelector('.text-big').textContent).toContain('拖拽文件到此区域');
  //   })
  // );

  // //文件数量大于0时，.text-big应该含有class  hidden
  // it("Text-big should contain class hidden if the files length is greater than 0", () => {
  //   store.overrideSelector(getFilesLength, 1);
  //   store.refreshState();
  //   fixture.detectChanges();

  //   const componentDebug = fixture.debugElement.nativeElement;
  //   const textBig = componentDebug.querySelector(".text");
  //   expect(textBig.className).toContain("text hidden");
  // });
});
