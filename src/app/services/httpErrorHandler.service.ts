import { PNotify } from 'pnotify/dist/es/PNotify';
import { PNotifyService } from './pNotifyService.service';
import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()
export class HttpErrorHandler implements ErrorHandler  {
  pnotify: any;
  loading: boolean;
  constructor( private pnotice: PNotifyService ) {
   this.pnotify = this.pnotice.getPNotify();

  }

  public handleError(err: any) {
    this.loading = false;
    this.pnotify.alert({
      text: 'Something went wrong please try again later',
      type: 'error'
    });
    console.error( 'error occured', err.message);
    console.log(err);
  }
}
