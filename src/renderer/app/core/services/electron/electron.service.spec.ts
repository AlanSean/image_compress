import { TestBed } from '@angular/core/testing';
import { ElectronService } from './electron.service';
import { NzMessageService, NzMessageModule } from 'ng-zorro-antd/message';
import { TranslateModule } from '@ngx-translate/core';

describe('ElectronService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NzMessageService, NzMessageService],
      imports: [NzMessageModule, TranslateModule.forRoot()],
    });
  });

  it('should be created', () => {
    const service: ElectronService = TestBed.inject(ElectronService);
    expect(service).toBeTruthy();
  });
});
