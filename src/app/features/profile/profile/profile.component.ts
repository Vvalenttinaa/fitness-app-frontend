import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatError,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Program } from '../../../model/program.model';
import { ProgramService } from '../../../services/program.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../model/user.model';
import Status from '../../../model/status.model';
import { ImageService } from '../../../services/image.service.ts.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatLabel,
    MatError,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatCardModule,
    JsonPipe,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  programs: Array<Program> = [];
  programsStatus: { [programId: number]: Status } = {};
  avatarId!: number;
  imageSrc!: string;

  programService: ProgramService = inject(ProgramService);
  userService: UserService = inject(UserService);
  imageService: ImageService = inject(ImageService);
  userId!: number;
  selectedFile: File | null = null;


  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
      mail: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(255)],
      ],
      firstName: ['', [Validators.required, Validators.maxLength(45)]],
      lastName: ['', [Validators.required, Validators.maxLength(45)]],
      city: ['', [Validators.required, Validators.maxLength(45)]],
      profileImageId: [null],
      card: ['',[ Validators.maxLength(12), Validators.minLength(12)]],
    });
  }

  ngOnInit(): void {
    const userId = this.getUserIdFromLocalStorage();
    if (userId != null) {
      this.userId = userId;
      this.userService.getUserById(userId).subscribe({
        next: (user: User) => {
          console.log(user);
          this.userForm.patchValue({
            mail: user.mail,
            firstName: user.firstName,
            lastName: user.lastName,
            city: user.cityName,
            profileImageId: user.avatar,
            card: user.card,
            password: user.password
          });
          this.avatarId = user.avatar;
          
          this.imageSrc = this.imageService.downloadProfileImage(this.avatarId);
          
        },
        error: (err) => console.error('Failed to load user data', err),
      });

      this.userService.getAllMyPrograms(userId).subscribe({
        next: (programsRes: Program[]) => {
          this.programs = programsRes;
          this.loadProgramStatuses();
        },
        error: (err) => console.error('Failed to load programs', err),
      });
    }
  }

  private loadProgramStatuses(): void {
    this.programs.forEach((program) => {
      this.userService.getProgramStatus(this.userId, program.id).subscribe({
        next: (status: Status) => {
          this.programsStatus[program.id] = status;
        },
        error: (err) => console.error('Failed to load program status', err),
      });
    });
  }

  private getUserIdFromLocalStorage(): number | null {
    if (typeof localStorage !== 'undefined') {
      const userId = localStorage.getItem('userId');
      return userId ? Number(userId) : null;
    }
    return null;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userService.editProfile(this.userId, this.userForm.value).subscribe({
        next: (res: User) => {
          console.log('Profile updated', res);
        },
        error: (err) => console.error('Failed to update profile', err),
      });
    } else {
      console.log('Form is not valid');
    }
  }

  onFileSelected(event: any): void {
    let file = event.target.files[0];
    this.selectedFile = file;

    if (!file) return;
    if(!this.userId) return;



    this.imageService.uploadProfileImage(file, this.userId ).subscribe({
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
            break;
        }
      },
      error: (error) => {
        console.error('Error uploading file:', error);
      },
      complete: () => {
        console.log('Upload process completed.');
        this.userService.getUserById(this.userId).subscribe({
          next: (user: User) => {
            console.log(user);
            this.userForm.patchValue({
              mail: user.mail,
              firstName: user.firstName,
              lastName: user.lastName,
              city: user.cityName,
              profileImageId: user.avatar,
              card: user.card,
              password: user.password
            });
            this.avatarId = user.avatar;
            
            this.imageSrc = this.imageService.downloadProfileImage(this.avatarId);
            
          },
          error: (err) => console.error('Failed to load user data', err),
        });
        
        this.imageSrc = this.imageService.downloadProfileImage(this.userId);
      }
    });
  }
}
