import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

// import { Observable } from 'rxjs/Observable';
import { tap, retry } from 'rxjs/operators';

import { HttpErrorHandler } from './httpErrorHandler.service';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(
    public errorHandler: HttpErrorHandler,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(retry(3), tap((err: any) => {
      if (err instanceof HttpErrorResponse) {

        console.error(err);
        this.errorHandler.handleError(err);

      }
    }));
    // return next.handle(request).pipe(tap((err: any) => {
    //   if (err instanceof HttpErrorResponse) {
    //     console.error(err);
    //     this.errorHandler.handleError(err);
    //   }
    // }));

  }
}
