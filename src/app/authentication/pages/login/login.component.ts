import { Component, OnInit, inject } from '@angular/core';
import { MatCard, MatCardAppearance, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import LoginRequest from '../../../model/login-request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../model/user.model';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButton, MatCard, MatCardTitle, MatCardContent, MatFormFieldModule, MatFormField, ReactiveFormsModule, CommonModule, MatInputModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private builder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.builder.group({
    username: new FormControl<string|null>(null, [Validators.required]),
    password: new FormControl<string|null>(null, Validators.required)
  })

  login() {
    var request: LoginRequest = {...this.loginForm.value};

    this.authService.login(request).subscribe({
      next: (response: User) => {
        if (response != null) {
          this.router.navigate(['']).then(() => {
          });
        } else {
          this.snackBar.open('Please activate account first.', undefined, {duration: 2000})
          this.router.navigate(['auth/activate']).then(() => {
          });
        }
      },
      error: (error: any) => {
        if (error.status === 401) {
          this.snackBar.open('Invalid credentials.', undefined, {duration: 2000});
        } else {
          this.snackBar.open('An error occurred!', undefined, {duration: 2000});
        }
      },
      complete: () => {
        this.loginForm.reset();
      }
    });
  }

}
