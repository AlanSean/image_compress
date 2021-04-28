import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '../../../core/core.module';
import { ImgListComponent } from './img-list.component';
import { selectFile } from '../../../core/core.module';

import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzModalService, NzModalModule } from 'ng-zorro-antd/modal';

describe('ImgListComponent', () => {
  let component: ImgListComponent;
  let fixture: ComponentFixture<ImgListComponent>;
  let store: MockStore;
  const initialState = { fileArr: [] };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImgListComponent],
      providers: [
        NzModalService,
        provideMockStore({ initialState })
        // other providers
      ],
      imports: [CoreModule, TranslateModule.forRoot(), FormsModule, NzSliderModule, NzSpinModule, NzModalModule]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectFile, [
      {
        MD5KEY: '',
        name: '',
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
        rawDataSize: '5.57 KB',
        nowDataSize: '--'
      }
    ]);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
