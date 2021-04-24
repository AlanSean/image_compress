import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { selectFile, getFilesLength, CoreModule } from '../core/core.module';

import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore;
  const initialState = { length: 0, filesArr: [] };
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HomeComponent],
        imports: [TranslateModule.forRoot(), RouterTestingModule, SharedModule, CoreModule, NzProgressModule, NzInputModule, NzMenuModule],
        providers: [provideMockStore({ initialState })]
      }).compileComponents();
      store = TestBed.inject(MockStore);
      store.overrideSelector(getFilesLength, 0);
      store.overrideSelector(selectFile, [
        {
          MD5KEY: '',
          state: 'finish',
          percentage: '-9.8%',
          src: 'file://C:/Users/111/Desktop/copy/start.jpg',
          path: 'C:/Users/111/Desktop/copy/start.jpg',
          extname: '.jpg',
          ext: 'jpg',
          outsrc:
            'J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg',
          outpath:
            'J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading',
          quality: '80',
          rawDataSize: '5.57 KB'
        }
      ]);
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

  it(
    'should render title in a span tag',
    waitForAsync(() => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.text-big').textContent).toContain('拖拽文件到此区域');
    })
  );

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
