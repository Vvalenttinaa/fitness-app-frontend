import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../../../services/category.service';
import Category from '../../../../model/category.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Attribute } from '../../../../model/attribute.model';

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
  ],
  templateUrl: './create-fitness-dialog.component.html',
  styleUrl: './create-fitness-dialog.component.css',
})
export class CreateFitnessDialogComponent implements OnInit {
  @Output() onCloseModel = new EventEmitter();
  route: ActivatedRoute = inject(ActivatedRoute);
  private builder = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<CreateFitnessDialogComponent>);
  categoryService = inject(CategoryService);

  value = '';
  selected!: Category;
  attributesList: Array<string> = [];
  categoryList: Array<Category> = [];

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
    Description: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(45),
    ]),
    Price: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(8),
    ]),
    Level: new FormControl<string | null>(null, [
      Validators.required,
      Validators.maxLength(4),
    ]),
    Duration: new FormControl<string | null>(null, [
      Validators.required,
      Validators.maxLength(4),
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
    Category: new FormControl<string | null>(null, [Validators.required]),
    attributes: this.builder.array([]),
  });

  get attributes() {
    return this.form.get('attributes') as FormArray;
  }

  createAttributes() {
    // const selectedValue = this.form.get('Category')?.value;
    // if (selectedValue) {
    //   let newAttributes = [''];
    //   if (selectedValue === 'option1') {
    //     newAttributes = ['Label 1', 'Label 2'];
    //   } else if (selectedValue === 'option2') {
    //     newAttributes = ['Label 3', 'Label 4'];
    //   } else if (selectedValue === 'option3') {
    //     newAttributes = ['Label 5', 'Label 6'];
    //   }
    //   this.attributes.clear();
    //   newAttributes.forEach(label => {
    //     this.attributes.push(this.builder.control(''));
    //   });
    // }
    // this.form.get('Category')?.setValue(this.selected);
    // const selectedValue = this.form.get('Category')?.value;
    // console.log(this.form.get('Category')?.value);
    // let newAttributes = this.form.get('Category')?.value.attributes;
    // this.attributes.clear();
    // newAttributes.forEach(name => {
    //   this.attributes.push(this.builder.control(''));
    // })

    // if (selectedValue && selectedValue.attributes) {
    //   this.attributes.clear();
    //   selectedValue.attributes.forEach((attribute: string) => {
    //     this.attributes.push(this.builder.control(attribute));
    //   });
    // }
    this.form.get('Category')?.setValue(this.selected);
    const selectedValue = this.form.get('Category')?.value;
    console.log(this.form.get('Category')?.value);
    if (selectedValue && selectedValue.attributes) {
    let newAttributes = selectedValue.attributes;
    this.attributes.clear();
    // newAttributes.forEach(() => {
    //   this.attributes.push(this.builder.control('', Validators.required));
    // });
    // newAttributes.forEach((attribute: Attribute) => {
    //   this.attributes.push(this.builder.group({
    //     id: attribute.id,
    //     name: attribute.name
    //   }));
    // });
    newAttributes.forEach((attribute: any) => {
      // Stvaranje FormControl sa objektom koji sadrži ime i ID atributa
      const formControlObject = this.builder.control({ name: attribute.name, id: attribute.id }); 
      this.attributes.push(formControlObject);
    });
  }
  }

  onCheckboxChange(event:any, index: any, id:any) {
    if (event.checked) {
      const selectedAttribute = this.attributes.at(index).value; // Dohvati cijeli objekt atributa iz niza atributa
      console.log('Selektovan je:', selectedAttribute);
      const selectedAttributeId = selectedAttribute.id;
      console.log('Selected attribute ID:', selectedAttributeId);
    }
  }

  onCreate() {
    this.dialogRef.close();
  }
}
