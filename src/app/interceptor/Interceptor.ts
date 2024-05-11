import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { constants } from '../constants/constants';
import { Router } from '@angular/router';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (event.type === HttpEventType.Response) {
          if (event.status === 401 && !event.url?.includes('/auth')) {
            this.router.navigate(['/login']);
          }
        }
      })
    );
  }

  //intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   if(localStorage.getItem(constants.CURRENT_TOKEN)){
  //     req = req.clone({
  //       headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem(constants.CURRENT_TOKEN)),
  //     });
  //  //   console.log(req);
  //   }
    
  //   return next.handle(req).pipe(
  //     tap((event) => {
  //       if (event.type === HttpEventType.Response) {
  //         if (event.status === 401 && !event.url?.includes('/auth')) {
  //           this.router.navigate(['/login']);
  //         }
  //       }
  //     })
  //   );
  }
//}