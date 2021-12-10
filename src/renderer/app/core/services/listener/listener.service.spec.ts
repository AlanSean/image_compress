import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NzMessageService, NzMessageModule } from 'ng-zorro-antd/message';

import { ListenerService } from './listener.service';

describe('ListenerService', () => {
  let service: ListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NzMessageService, NzMessageService],
      imports: [NzMessageModule, TranslateModule.forRoot()]
    });
    service = TestBed.inject(ListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
