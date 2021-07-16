import { ApplicationRef, Injectable } from '@angular/core';

import { messageType } from '@common/constants';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ListenerService {
  constructor(private cdr: ApplicationRef, private message: NzMessageService, private translate: TranslateService) {}

  toast = (type: messageType, message: string, options?: number) => {
    this.message.remove();
    this.message[type](message && this.translate.instant(message, options));
    this.cdr.tick();
  };
}
