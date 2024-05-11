import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistrationRequest } from '../../../model/registration-request.model';
import { MatCard, MatCardContent, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../model/user.model';
import { error } from 'console';


@Component({
  selector: 'app-registration',
  standalone:true,
  imports:[RouterLink, MatCard, MatIcon, MatInputModule, MatCardTitle, MatCardModule, MatCardContent, MatRadioModule, CommonModule, ReactiveFormsModule ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  gender!: string;
  private builder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);

    registerForm: FormGroup = this.builder.group({
    username: new FormControl<string | null>(null, [Validators.required, Validators.minLength(2)]),
    password: new FormControl<string | null >(null, [Validators.required, Validators.minLength(6)]),
    firstName: new FormControl<string|null>(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    lastName: new FormControl<string|null>(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    mail: new FormControl<string|null>(null, [Validators.required, Validators.email]),
    card: new FormControl <string|null> (null),
    city: new FormControl<string|null>(null, Validators.required),
    gender: new FormControl('', Validators.required)

  });

  register() {
    // const request: RegistrationRequest = {
    //   username: this.registerForm.value.username,
    //   password: this.registerForm.value.password,
    //   firstName: this.registerForm.value.firstName,
    //   lastName: this.registerForm.value.lastName,
    //   email: this.registerForm.value.email,
    //   card: this.registerForm.value.card,
    //   city: this.registerForm.value.city,
    //   avatarUrl:
    //     this.registerForm.value === 'male'
    //       ? "src\assets\images\male.png."
    //       : "src\assets\images\female.png.",
    // };

    var request: RegistrationRequest = {...this.registerForm.value};
    console.log(request);
    this.authService.register(request).subscribe({
      next: (user: User) => {
        console.log('Sucessfuly sent registration');
      },
      error: (error) => {
        console.log('Error in registration ', error);
      }
    })

    this.snackBar.open('Account created sucessfully! PIN has been sent to your e-mail. Please activate account.', undefined, {
      duration: 4000,
    });
  }
}