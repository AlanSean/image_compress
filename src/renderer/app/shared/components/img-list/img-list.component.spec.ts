import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ImgListComponent } from './img-list.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzModalService, NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageService, NzMessageModule } from 'ng-zorro-antd/message';
import { ElectronService, FilesService, ActionsService } from '@app/core/services';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

describe('ImgListComponent', () => {
  let component: ImgListComponent;
  let fixture: ComponentFixture<ImgListComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImgListComponent],
      providers: [NzModalService, NzMessageService, ElectronService, FilesService, ActionsService],
      imports: [
        TranslateModule.forRoot(),
        CommonModule,
        FormsModule,
        NzSliderModule,
        NzSpinModule,
        NzModalModule,
        NzMessageModule,
      ],
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
