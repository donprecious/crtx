import { PNotify } from 'pnotify/dist/es/PNotify';
import { PNotifyService } from './pNotifyService.service';
import { Injectable, ErrorHandler } from '@angular/core';
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://cc45dbaf9b1546898348b6cd062113d0@sentry.io/1432541'
});
@Injectable()
export class HttpErrorHandler implements ErrorHandler  {
  pnotify: any;
  loading: boolean;
  constructor( private pnotice: PNotifyService ) {
   this.pnotify = this.pnotice.getPNotify();

  }

  public handleError(err: any) {
    this.loading = false;
    // this.pnotify.alert({
    //   text: 'Something went wrong please try again later',
    //   type: 'error'
    // });
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', err.error.message);
      Sentry.captureException(err.error.message || err);
      this.pnotify.alert({
        text: err.error.message,
        type: 'error'
      });
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${err.status}, ` +
        `body was: ${err.error}`);
        this.pnotify.alert({
          text: `Error Code: ${err.status}\n Message: ${err.message}`,
          type: 'error'
        });
        Sentry.captureException(err.message || err);
    }
    //
    console.error( 'error occured', err.message);
    console.log(err);
  }
}
