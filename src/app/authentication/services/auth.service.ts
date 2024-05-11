import { Injectable, inject } from '@angular/core';
import { User } from '../../model/user.model';
import { Observable, of, throwError } from 'rxjs';
import LoginRequest from '../../model/login-request';
import { LoginComponent } from '../pages/login/login.component';
import { error } from 'console';
import { HttpClient } from '@angular/common/http';
import { apiEndpoint } from '../../constants/constants';
import { RegistrationRequest } from '../../model/registration-request.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usersList!: Observable<User[]>;
  http: HttpClient = inject(HttpClient);

  login(req: LoginRequest): Observable<User> {
    return this.http.post<User>(apiEndpoint.AuthEndpoint.login, req);
  }

  register(req: RegistrationRequest): Observable<User>{
    return this.http.post<User>(apiEndpoint.AuthEndpoint.register, req);
  }
}
