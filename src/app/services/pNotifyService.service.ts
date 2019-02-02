// import { PNotifyButtons } from 'pnotify/dist/es/PNotifyButtons';
// pnotify.service.ts
import { Injectable } from '@angular/core';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';

@Injectable()
export class PNotifyService {
  getPNotify() {
    // tslint:disable-next-line:no-unused-expression
    PNotifyButtons; // Initiate the module. Important!
    PNotify.defaults.styling = 'bootstrap3';
    PNotify.defaults.icons = 'fontawesome4';
    return PNotify;
  }
}
