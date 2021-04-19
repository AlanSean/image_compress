import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgListComponent } from './img-list.component';

describe('ImgListComponent', () => {
  let component: ImgListComponent;
  let fixture: ComponentFixture<ImgListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgListComponent ]
    }).compileComponents();
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
