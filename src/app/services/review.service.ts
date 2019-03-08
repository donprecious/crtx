

import { IReviewNotification } from './IReviewNotification';
import { IReview } from './IReview';

export interface IReviewAndNotification {
review: IReview;
reviewNotification: IReviewNotification;
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
  reviewNotification: IReviewNotification;

  baseUrl: string;

  constructor(private http: HttpClient,
     @Inject('API_URL') apiUrl: string) {
    this.baseUrl = apiUrl;
   }

    createReview (reviewAndNotification: IReviewAndNotification): Observable<IReviewAndNotification> {
    return this.http.post<IReviewAndNotification>(this.baseUrl + 'Review/create', reviewAndNotification, httpOptions);
    }
    getReview(id: number): Observable<IReviewNotification> {
      return this.http.get<IReviewNotification>(this.baseUrl + 'Review/' + id, httpOptions);
    }
    getReviewKind(): Observable<IReviewKind[]> {
      return this.http.get<IReviewKind[]>(this.baseUrl + 'review/GetReviewKind', httpOptions);
    }
    getReviewAction(): Observable<IReviewAction[]> {
      return this.http.get<IReviewAction[]>(this.baseUrl + 'review/GetReviewAction', httpOptions);
    }
    getCustomerReview(id: string): Observable<any[]>  {
      return this.http.get<any[]>(this.baseUrl + 'review/GetCustomerReview/' + id, httpOptions);
    }
    getReminder(orgId: number, isToday: boolean): Observable<any[]>  {
      return this.http.get<any[]>(this.baseUrl + `review/GetOrgReminders/${orgId}/${isToday}`, httpOptions);
    }
    getPayments(orgId: number, isToday: boolean): Observable<any[]>  {
      return this.http.get<any[]>(this.baseUrl + `review/GetDuePayments/${orgId}/${isToday}`, httpOptions);
    }
    getReschedule(orgId: number, isToday: boolean): Observable<any[]>  {
      return this.http.get<any[]>(this.baseUrl + `review/GetReschedule/${orgId}/${isToday}`, httpOptions);
    }
    getQueryForUpdate(orgId: number): Observable<any[]>  {
      return this.http.get<any[]>(this.baseUrl + `review/GetQueryReviews/${orgId}`, httpOptions);
    }
    getQueries(orgId: number): Observable<any[]>  {
      return this.http.get<any[]>(this.baseUrl + `review/GetQueryForUpdate/${orgId}/`, httpOptions);
    }

}
