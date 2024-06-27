import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardContent, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Router, RouterLink } from '@angular/router';
import { RegistrationRequest } from '../../../model/registration-request.model';
import { User } from '../../../model/user.model';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { ImageService } from '../../../services/image.service.ts.service';
import { HttpEventType } from '@angular/common/http';
import { MessageDialogService } from '../../../services/message-dialog.service';


@Component({
  selector: 'app-registration',
  standalone:true,
  imports:[RouterLink, MatCard, MatIcon, MatInputModule, MatCardTitle, MatCardModule, MatCardContent, MatRadioModule, CommonModule, ReactiveFormsModule ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  private builder = inject(FormBuilder);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private imageService = inject(ImageService);
  private messageService = inject(MessageDialogService);

  private router = inject(Router);
    selectedFile: File | null = null;

    shortLink: string = ""; 
    loading: boolean = false;
    file!: File;

    registerForm: FormGroup = this.builder.group({
    username: new FormControl<string | null>(null, [Validators.required, Validators.minLength(2)]),
    password: new FormControl<string | null >(null, [Validators.required, Validators.minLength(8)]),
    firstName: new FormControl<string|null>(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    lastName: new FormControl<string|null>(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    mail: new FormControl<string|null>(null, [Validators.required, Validators.email]),
    card: new FormControl <string|null> (null),
    city: new FormControl<string|null>(null, Validators.required),

  });

  register() {
    var request: RegistrationRequest = { ...this.registerForm.value };
    console.log(request);
    this.authService.register(request).subscribe({
      next: (user: User) => {
        console.log('Successfully sent registration', user);
        this.messageService.showMessageDialog('Activate account', 'Please check your email to activate account');
        
  
        if (!this.file || !user.id) {
          this.router.navigate(['registration']);
          return;
        }
  
        this.imageService.uploadProfileImage(this.file, user.id).subscribe({
          next: (event: any) => {
            switch (event.type) {
              case HttpEventType.UploadProgress:
                if (event.total) {
                  const progress = Math.round(100 * event.loaded / event.total);
                  console.log(`File is ${progress}% uploaded.`);
                }
                break;
              case HttpEventType.Response:
                console.log('File uploaded successfully!', event.body);
                this.router.navigate(['registration']);
                break;
            }
          },
          error: (error) => {
            console.error('Error uploading file:', error);
            this.router.navigate(['registration']);
          },
        });
      },
      error: (error) => {
        console.log('Error in registration', error);
      }
    });
  }
  

  onChange(event: any) { 
      this.file = event.target.files[0];
  } 
  
}