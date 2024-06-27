import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiNinjasService {

  apiKey = 'NKEicSz2X6ohVSjWT1olcw==ZoMoEtNiE8gRsCMC';
  apiUrl = '/api/v1/exercises';

  constructor(private http: HttpClient) {}

  getExercises(): Observable<any> {
    const headers = new HttpHeaders({
      'X-Api-Key': this.apiKey
    });
    return this.http.get(this.apiUrl, { headers });
  }
}
