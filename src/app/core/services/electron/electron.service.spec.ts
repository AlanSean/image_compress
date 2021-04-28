import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { ElectronService } from './electron.service';
import { NzMessageService, NzMessageModule } from 'ng-zorro-antd/message';

describe('ElectronService', () => {
  let store: MockStore;
  let message: NzMessageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore(), NzMessageService],
      imports: [NzMessageModule]
    });
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    const service: ElectronService = TestBed.inject(ElectronService);
    expect(service).toBeTruthy();
  });
});
