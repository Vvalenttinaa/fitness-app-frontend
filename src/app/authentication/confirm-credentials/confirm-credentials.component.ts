import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import LoginRequest from '../../model/login-request';
import { User } from '../../model/user.model';
import { AuthService } from '../../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MessageDialogService } from '../../services/message-dialog.service';

@Component({
  selector: 'app-confirm-credentials',
  standalone: true,
  imports: [MatCard, MatCardTitle, MatCardContent, MatFormFieldModule, ReactiveFormsModule, RouterLink, MatInputModule, MatButtonModule],
  templateUrl: './confirm-credentials.component.html',
  styleUrls: ['./confirm-credentials.component.css']
})
export class ConfirmCredentialsComponent {
  private builder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private messageService = inject(MessageDialogService);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmCredentialsComponent> // Dodaj MatDialogRef u konstruktor
  ) {}

  loginForm: FormGroup = this.builder.group({
    username: new FormControl<string | null>(null, [Validators.required]),
    password: new FormControl<string | null>(null, Validators.required),
  });

  login(): void {
    var request: LoginRequest = { ...this.loginForm.value };
    this.authService.sendEmail(request);
    // this.authService.sendEmail(request).subscribe({
    //   next: (user: User) => {
    //     if (user.active) {
    //       console.log('User logged in:', user);
    //       this.dialogRef.close();
    //       this.router.navigate(['']).then(() => {});
    //     } else {
    //       this.messageService.showMessageDialog('Wrong credentials!', 'Please try again.');
    //     }
    //   },
    //   error: (error) => {
    //     console.error('Login error:', error);
    //     this.messageService.showMessageDialog('Credentials error', 'Please check your credentials and try again.');
    //   }
    // });
  }
}
