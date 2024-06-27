import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UploadComponent } from '../upload/upload.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatDialogClose, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { ImageService } from '../../../../services/image.service.ts.service';

@Component({
  selector: 'app-created-program-dialog',
  standalone: true,
  imports: [
    JsonPipe,
    UploadComponent,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogClose,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './created-program-dialog.component.html',
  styleUrls: ['./created-program-dialog.component.css']
})
export class CreatedProgramDialogComponent {
  programId: number;
  form: FormGroup;
  uploadedFile: File | null = null;
  imageService = inject(ImageService);
  dialogRef = inject(MatDialogRef<CreatedProgramDialogComponent>);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private builder: FormBuilder
  ) {
    console.log('Constructor created');
    this.programId = data.programId;

    this.form = this.builder.group({
      documentId: new FormControl<string | null>(null, Validators.required)
    });
  }

  get documentId(): FormControl {
    return this.form.get('documentId') as FormControl;
  }

  onFileUpload(event: any) {
    console.log('on file upload', event);
    this.documentId.patchValue(event.id);
    this.uploadedFile = event.file;
  }

  onDone() {
    this.dialogRef.close();
  }
}