import { Component, EventEmitter, Inject, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Image } from '../../../../model/image.model';
import { ImageService } from '../../../../services/image.service.ts.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent {
  @Output('fileUploaded')
  fileUploaded = new EventEmitter<Image | null>();
  imageService = inject(ImageService);

  @Input()
  uploadedFileData: any;
  @Input()
  programId!: number | null;

  data!: File | null;
  loader = false;
  message!: string;

  removeFile() {
    this.data = null;
    this.uploadedFileData = null;
    this.fileUploaded.emit(null);
  }

  onChanges(event: any) {
    let file = event.target.files[0];
    this.data = file;

    if (!file) return;
    if(!this.programId) return;
    this.loader = true;


    this.imageService.uploadImage(file, this.programId ).subscribe({
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
            this.loader=false;
            this.uploadedFileData = event?.[0];
            this.fileUploaded.emit(event.body);
            break;
        }
      },
      error: (error) => {
        console.error('Error uploading file:', error);
      },
      complete: () => {
        console.log('Upload process completed.');
      }
    });
    
    // this.resourceService.uploadDocument(file).subscribe({
    //   next: (res: any) => {
    //     this.uploadedFileData = res;
    //     this.loader = false;
    //     this.fileUploaded.emit(res);
    //   },
    //   error: (err) => {
    //     this.loader = false;
    //     console.log(err?.message);
    //     this.data = null;
    //   },
    // });
    // this.documentService
    //   .uploadFile(formData)
    //   .pipe(first())
    //   .subscribe({
    //     next: (res: any) => {
    //       this.uploadedFileData = res?.[0];
    //       this.loader = false;
    //       this.fileUploaded.emit({ ...res?.[0] });
    //     },
    //     error: (err) => {
    //       this.loader = false;
    //       console.log(err?.message);
    //       this.data = null;
    //     },
    //   });
  }
}
