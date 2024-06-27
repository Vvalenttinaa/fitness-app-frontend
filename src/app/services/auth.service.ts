import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import LoginRequest from '../model/login-request';
import { User } from '../model/user.model';
import { apiEndpoint } from '../constants/constants';
import { RegistrationRequest } from '../model/registration-request.model';
import { MessageDialogService } from './message-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatusSubject: BehaviorSubject<boolean>;
  public authStatus$: Observable<boolean>;

  private messageService = inject(MessageDialogService);

  constructor(private http: HttpClient) {
    const isLoggedIn = this.checkLocalStorage() && !!localStorage.getItem('userId');
    this.authStatusSubject = new BehaviorSubject<boolean>(isLoggedIn);
    this.authStatus$ = this.authStatusSubject.asObservable();
  }

  private checkLocalStorage(): boolean {
    return typeof localStorage !== 'undefined';
  }

  login(request: LoginRequest): Observable<User> {
    return this.http.post<User>(`${apiEndpoint.AuthEndpoint.login}`, request).pipe(
      tap((user: User) => {
        if (this.checkLocalStorage()) {
          localStorage.setItem('userId', user.id.toString());
          this.authStatusSubject.next(true);
        }
      })
    );
  }

  register(req: RegistrationRequest): Observable<User> {
    return this.http.post<User>(`${apiEndpoint.AuthEndpoint.register}`, req).pipe(
      tap((user: User) => {
        if (this.checkLocalStorage()) {
        //  localStorage.setItem('userId', user.id.toString());
        //  this.authStatusSubject.next(true);
        }
      })
    );
  }

  sendEmail(loginRequest: LoginRequest) {
    this.http.post(`${apiEndpoint.AuthEndpoint.sendReactivation}`, loginRequest).subscribe({
      next: (res: any) => {
        console.log('Mail sent');
        this.messageService.showMessageDialog('Activation', 'Mail was sent to you');
      },
      error: (error) => {
        console.error('Error sending mail:', error);
      }
    });
  }

  logout(): void {
    if (this.checkLocalStorage()) {
      localStorage.removeItem('userId');
      this.authStatusSubject.next(false);
    }
  }

  isLoggedIn(): boolean {
    return this.checkLocalStorage() && !!localStorage.getItem('userId');
  }
}
