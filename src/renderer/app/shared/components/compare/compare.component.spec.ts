import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('appCompare', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [SharedModule, NoopAnimationsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  template: `
    <div appCompare appCompare [appCompareData]="appCompareData"></div>
  `
})
export class TestComponent {
  appCompareData = {
    state: 'await',
    MD5KEY: 'q23',
    outdir: '',
    name: '',
    percentage: '-9.8%',
    src: 'file://C:/Users/黄清/Desktop/copy/start.jpg',
    path: 'C:/Users/黄清/Desktop/copy/start.jpg',
    extname: '.jpg',
    ext: 'jpg',
    outsrc:
      'J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg',
    outpath:
      'J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading',
    quality: '80',
    rawDataSize: '5.57 KB',
    nowDataSize: '2.28 KB'
  };
}
