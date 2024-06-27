import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { apiEndpoint } from '../constants/constants';
import Subscription from '../model/subscription.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  http: HttpClient = inject(HttpClient);

  getAll(id:number): Observable<Subscription[]>{
    return this.http.get<Subscription[]>(`${apiEndpoint.SubscriptionEndpoint.getAll}`.replace(':id', id.toString()));
  }

  addSubscription(id: number, categoryId: number)
  {
    return this.http.post<Subscription>(`${apiEndpoint.SubscriptionEndpoint.addSubscription}`+ `/${id}/fitness-program/${categoryId}/subscribe`, {});
  }
}
