import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import FitnessNews from '../model/fitnessnews.model';
import { apiEndpoint } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  http: HttpClient = inject(HttpClient);

  getAll(): Observable<FitnessNews[]>{
    return this.http.get<FitnessNews[]>(`${apiEndpoint.NewsEndpoint.getAll}`);
  }

}
