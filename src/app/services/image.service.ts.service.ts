import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Image } from '../model/image.model';
import { apiEndpoint } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  http: HttpClient = inject(HttpClient);

  downloadImage(id: number): string {
    const headers = new HttpHeaders({
      Accept: 'image/*',
    });
    const url = `${apiEndpoint.ImageEndpoint.getById}`.replace(
      ':id',
      id.toString(),
    );
    return url;
    // return this.http.get(`${url}`,
    //  {
    //   headers: headers,
    //   responseType: 'blob',
    //   observe: 'response'
    // }
    // );
  }

  downloadByProgramImage(id: number): string {
    const headers = new HttpHeaders({
      Accept: 'image/*',
    });
    const url = `${apiEndpoint.ImageEndpoint.getByProgramId}`.replace(
      ':id',
      id.toString(),
    );
    console.log('idem na', url);

    return url;
    // return this.http.get(`${url}`,
    //  {
    //   headers: headers,
    //   responseType: 'blob',
    //   observe: 'response'
    // }
    // );
  }

  downloadProfileImage(id: number): string {
    if(id== null || id==undefined){
      return '';
    }
    const headers = new HttpHeaders({
      Accept: 'image/*',
    });
    const url = `${apiEndpoint.ImageEndpoint.getProfileImageById}`.replace(
      ':id',
      id.toString(),
    );
    return url;
    // return this.http.get(`${url}`,
    //  {
    //   headers: headers,
    //   responseType: 'blob',
    //   observe: 'response'
    // }
    // );
  }

  uploadImage(image: File, programId: number): Observable<HttpEvent<any>> {
    console.log('Upload image se desava');
    const formData: FormData = new FormData();
    formData.append('image', image, image.name);
    formData.append('programId', programId.toString());
    const url = `${apiEndpoint.ImageEndpoint.insert}`;
    const headers = new HttpHeaders({
      Accept: 'application/json',
    });

    return this.http
      .post<any>(url, formData, {
        headers: headers,
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              if (event.total) {
                const progress = Math.round((100 * event.loaded) / event.total);
                console.log(`File is ${progress}% uploaded.`);
              }
              break;
            case HttpEventType.Response:
              console.log('File uploaded successfully!', event.body);
              return event;
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('File upload failed!', error);
          throw error;
        }),
      );
  }

  uploadProfileImage(image: File, userId: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('image', image, image.name);
    formData.append('userId', userId.toString());
    const url = `${apiEndpoint.ImageEndpoint.insertProfileImage}`;
    const headers = new HttpHeaders({
      Accept: 'application/json',
    });

    return this.http
      .post<any>(url, formData, {
        headers: headers,
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              if (event.total) {
                const progress = Math.round((100 * event.loaded) / event.total);
                console.log(`File is ${progress}% uploaded.`);
              }
              break;
            case HttpEventType.Response:
              console.log('File uploaded successfully!', event.body);
              return event;
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('File upload failed!', error);
          throw error;
        }),
      );
  }
}
