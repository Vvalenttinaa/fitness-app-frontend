import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import LoginRequest from '../../../model/login-request';
import { User } from '../../../model/user.model';
import { AuthService } from '../../../services/auth.service';
import { ConfirmCredentialsComponent } from '../../confirm-credentials/confirm-credentials.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormFieldModule,
    MatFormField,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private builder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);

  mess: string = '';

  loginForm: FormGroup = this.builder.group({
    username: new FormControl<string | null>(null, [Validators.required]),
    password: new FormControl<string | null>(null, Validators.required),
  });

  login(): void {
    var request: LoginRequest = { ...this.loginForm.value };
    this.authService.login(request).subscribe({
      next: (user: User) => {
        if (user.active == 'false') {
          const dialogRef = this.dialog.open(ConfirmCredentialsComponent, {
            width: '50%',
            disableClose: false,
          });
         }
         else {
          console.log('User logged in:', user);
          this.router.navigate(['']).then(() => {});
        }
      },
      error: (err) =>{
        console.log("Wrong creds");
        this.mess = "wRONG";
      }
    });
  }
}
