import { PNotify } from 'pnotify/dist/es/PNotify';
import { PNotifyService } from './pNotifyService.service';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpErrorHandler {
  pnotify: any;
  constructor( private pnotice: PNotifyService ) {
   this.pnotify = this.pnotice.getPNotify();

  }

  public handleError(err: any) {
    this.pnotify.alert({
      text: err.message,
      type: 'error'
    });
    console.log(err.message, 'close');
  }
}
