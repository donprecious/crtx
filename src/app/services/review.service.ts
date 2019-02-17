

import { IReviewNotification } from './IReviewNotification';
import { IReview } from './IReview';

export interface IReviewAndNotification {
review: IReview;
reviewNotfication: IReviewNotification;
}
export interface IReviewKind {
  id: number;
  name: string;
}
export interface IReviewAction {
  id: number;
  name: string;
}

import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json' // ,
  //  'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ReviewService implements IReviewAndNotification {
  review: IReview;
  reviewNotfication: IReviewNotification;

  baseUrl: string;

  constructor(private http: HttpClient,
     @Inject('API_URL') apiUrl: string) {
    this.baseUrl = apiUrl;
   }
   createReview (reviewAndNotification: IReviewAndNotification): Observable<IReviewAndNotification> {
    return this.http.post<IReviewAndNotification>(this.baseUrl + 'CustomerReview/create', reviewAndNotification, httpOptions);
    }
    getReview(id: number): Observable<IReviewNotification> {
      return this.http.get<IReviewNotification>(this.baseUrl + 'CustomerReview/' + id, httpOptions);
    }
    getReviewKind(): Observable<IReviewKind[]> {
      return this.http.get<IReviewKind[]>(this.baseUrl + 'review/GetReviewKind', httpOptions);
    }
    getReviewAction(): Observable<IReviewAction[]> {
      return this.http.get<IReviewAction[]>(this.baseUrl + 'review/GetReviewAction', httpOptions);
    }

}
