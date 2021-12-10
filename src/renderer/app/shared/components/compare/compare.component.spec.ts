import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  template: `
    <div appCompare [appCompareData]="appCompareData"></div>
  `
})
class TestComponent {
  appCompareData = {
    state: 'await',
    MD5KEY: 'q23',
    outdir: '',
    name: '',
    percentage: '-9.8%',
    src: 'xxxx.jpg',
    path: 'xxxx.jpg',
    extname: '.jpg',
    ext: 'jpg',
    outsrc: 'xxxx.jpg',
    outpath: 'xxxx',
    quality: '80',
    rawDataSize: '5.57 KB',
    nowDataSize: '2.28 KB'
  };
}

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
