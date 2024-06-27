import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import Statistic from '../model/statistic.model';
import StatisticRequest from '../model/statistic-request.model';
import { apiEndpoint } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  http: HttpClient = inject(HttpClient);

  getAll(id:number): Observable<Statistic[]>{
    return this.http.get<Statistic[]>(`${apiEndpoint.StatisticEndpoint.getAll}`+`/${id}/statistic`);
  }

  addStatistic(statisticRequest: StatisticRequest, id: number)
  {
    return this.http.post<Statistic>(`${apiEndpoint.StatisticEndpoint.addStatistic}`+ `/${id}/statistic`, statisticRequest);
  }

  downloadResults(id:number): Observable<Blob>
  {
    return this.http.get(`${apiEndpoint.StatisticEndpoint.getAll}`+`/${id}/statistic/download`, { responseType: 'blob' });
  }
}
