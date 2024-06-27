import { CommonModule, JsonPipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import {
  MatError,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import Category from '../../../../model/category.model';
import { Image } from '../../../../model/image.model';
import { ProgramRequest } from '../../../../model/program-request.model';
import { Program } from '../../../../model/program.model';
import { CategoryService } from '../../../../services/category.service';
import { ProgramService } from '../../../../services/program.service';
import { CreatedProgramDialogComponent } from '../created-program-dialog/created-program-dialog.component';
import { UploadComponent } from '../upload/upload.component';

@Component({
  selector: 'app-create-fitness-dialog',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatIcon,
    MatButtonModule,
    CommonModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatError,
    MatInputModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatLabel,
    MatIcon,
    MatDivider,
    MatFormFieldModule,
    JsonPipe,
    MatRadioModule,
    UploadComponent,
  ],
  templateUrl: './create-fitness-dialog.component.html',
  styleUrls: ['./create-fitness-dialog.component.css'],
})
export class CreateFitnessDialogComponent implements OnInit {
  @Output() onCloseModel = new EventEmitter();
  route: ActivatedRoute = inject(ActivatedRoute);
  private builder = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<CreateFitnessDialogComponent>);
  categoryService = inject(CategoryService);
  programService = inject(ProgramService);

  value = '';
  
  uploadedFiles = new Map<string, Image>();
  programId!: number | null;

  categoryList: Category[] = [];
  selectedCategory: Category | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.categoryService.getAll().subscribe({
      next: (categories: Category[]) => {
        this.categoryList = categories;
      },
    });
  }

  form: FormGroup = this.builder.group({
    Name: new FormControl<string | null>(null, [
      Validators.required,
      Validators.maxLength(45),
    ]),
    Description: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(45)]),
    Price: new FormControl<string | null>(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(10000),
    ]),
    Level: new FormControl<string | null>(null, [
      Validators.required,
      Validators.max(5),
      Validators.min(1)
    ]),
    Duration: new FormControl<string | null>(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(10000)
    ]),
    Contact: new FormControl<string | null>(null, [
      Validators.required,
      Validators.maxLength(45),
    ]),
    Location: new FormControl<string | null>(null, [
      Validators.required,
      Validators.maxLength(45),
    ]),
    Instructor: new FormControl<string | null>(null, [
      Validators.required,
      Validators.maxLength(45),
    ]),
     Category: new FormControl<Category | null>(null, Validators.required),
     attributes: this.builder.group({}),
    // attributes: this.builder.array([]),
    // category: [null, Validators.required],
    //   attributes: this.fb.group({})
    documentIds: this.builder.array([]),
  });

  get documentIds(): FormArray {
    return this.form.get('documentIds') as FormArray;
  }

  createAttributes() {

    const attributesForm = this.form.get('attributes') as FormGroup;
    Object.keys(attributesForm.controls).forEach(control => {
    attributesForm.removeControl(control);
  });
    console.log(attributesForm);
    
    if (this.selectedCategory) {
      this.selectedCategory.attributes.forEach(attr => {
        attributesForm.addControl(attr.name, new FormControl(''));
      });
    }
  }

  // get attributes(): FormArray {
  //   return this.form.get('attributes') as FormArray;
  // }
 
  // newAttribute(): FormGroup {
  //   return this.builder.group({
  //     attributeName: '',
  //     descriptionAttribute: new FormControl<string | null>(null, [
  //       Validators.required,
  //       Validators.maxLength(45),
  //     ]),
  //   });
  // }
 
  // addAttribute() {
  //   this.attributes.push(this.newAttribute());
  // }
 
  // removeAttribute(empIndex: number) {
  //   this.attributes.removeAt(empIndex);
  // }

  // additionalDescriptions(index: number): FormArray {
  //   return this.attributes.at(index).get('additionalDescriptions') as FormArray;
  // }

  // newAdditionalDescription(): FormGroup {
  //   return this.builder.group({
  //     description: '',
  //   });
  // }
 
  // addAdditionalDescription(index: number) {
  //   this.additionalDescriptions(index).push(this.newAdditionalDescription());
  // }
  
  // removeAdditionalDescription(indexAttribute: number, indexDescription: number) {
  //   this.additionalDescriptions(indexAttribute).removeAt(indexDescription);
  // }

  // createAttributes() {
  //   console.log('selected category is ', this.selected);
  //   const selectedAttributes = this.selected?.attributes;
  //   console.log('selected attributes are', selectedAttributes);
  //   if (selectedAttributes) {
  //     const attributesFormArray = this.form.get('attributes') as FormArray;
  //     attributesFormArray.clear();
  //     selectedAttributes.forEach((attribute) => {
  //       const attributeGroup = this.builder.group({
  //         // selected: [false],
  //         attributeName: attribute.name,
  //         // additionalDescriptions: this.builder.array([]),
  //       });
  //       attributesFormArray.push(attributeGroup);
  //     });
  //     this.attributesList = selectedAttributes;
  //   }
  // }

  removeDocument(index: number) {
    this.documentIds.removeAt(index);
  }

  onFileUpload(event: any, index: number) {
    const documentIdControl = this.documentIds.at(index);
    this.uploadedFiles.set(documentIdControl.value, event);
  }

  onCreate() {
    if (this.form.valid) {
      console.log('forma je validna');
      // const program: ProgramRequest = {
      //   ...this.form.value,
      //   // CategoryId: this.selected.id,
      // };

      const attributeDescriptions = this.selectedCategory?.attributes.map(attr => {
        return {
          attributeId: attr.id,
          name: this.form.get('attributes')?.get(attr.name)?.value
        };
      }) || [];

      const programRequest: ProgramRequest = {
        name: this.form.get('Name')?.value,
        price: parseFloat(this.form.get('Price')?.value),
        description: this.form.get('Description')?.value,
        level: parseInt(this.form.get('Level')?.value),
        duration: parseInt(this.form.get('Duration')?.value),
        contact: this.form.get('Contact')?.value,
        locationName: this.form.get('Location')?.value,
        instructorName: this.form.get('Instructor')?.value,
        categoryId: this.form.get('Category')?.value.id,
        attributes: attributeDescriptions
      };

      console.log(programRequest);

      this.programService.insertProgram(programRequest).pipe(take(1)).subscribe({
        next: (response: Program) => {
          console.log('dobio response');
          this.programId = response.id;
          this.dialogRef.close();
          this.dialog.open(CreatedProgramDialogComponent, {
            data: {
              programId: this.programId,
            },
          });
        },
        error: (err: any) => console.error(err),
      });
    }else{
      console.log('forma nije validna');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
