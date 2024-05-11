import { Component, inject } from '@angular/core';
import Category from '../../../../model/category.model';
import { Attribute } from '../../../../model/attribute.model';
import { ProgramService } from '../../../../services/program.service';
import { Program } from '../../../../model/program.model';
import { CardComponent } from '../../../../components/card/card.component';
import {MatFormField, MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { CategoryService } from '../../../../services/category.service';
import { AttributeService } from '../../../../services/attribute.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateFitnessDialogComponent } from '../../components/create-fitness-dialog/create-fitness-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import Filter from '../../../../model/filter.model';
import { AttributeDescription } from '../../../../model/attributedescription.model';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { UserService } from '../../../../services/user.service';
import { error } from 'console';


@Component({
  selector: 'app-page-programs',
  standalone: true,
  imports: [MatCheckboxModule, ReactiveFormsModule, CardComponent, MatInputModule,MatIcon, MatOptionModule, MatSelectModule, FormsModule, MatFormField, MatButtonModule, MatOptionModule, CommonModule],
  templateUrl: './page-programs.component.html',
  styleUrl: './page-programs.component.css'
})
export class PageProgramsComponent{

  category = new FormControl('');
  attribute = new FormControl('');
  search = new FormControl('');
  description = new FormControl('');
  categoryList: Category[] = [];
  attributeList: Attribute[] = [];
  attributeDesList: AttributeDescription[] = [];
  categoryService: CategoryService = inject(CategoryService);
  fitnessProgramService: ProgramService = inject(ProgramService);
  userService: UserService = inject(UserService);

  public programsArray: Array<Program> = [];
  private dialog = inject(MatDialog);

  checked = false;
  isDisabledBtn: boolean = false;

  ngOnInit(): void {
    
    this.fitnessProgramService.getAll().subscribe({
      next: (programs: Program[]) => {
        this.programsArray = programs;
      },
      error: (error) => {
        console.error('Error fetching programs:', error);
      }
    });

    this.categoryService.getAll().subscribe({
      next:(category: Category[]) =>{
        this.categoryList = category;
      },
      error: (error) =>{
        console.error('Error fetching categories:', error);
      }
    });

    this.categoryService.getAllAttributes().subscribe({
      next:(attribute: Attribute[]) =>{
        this.attributeList = attribute;
      },
      error: (error) =>{
        console.error('Error fetching attributes:', error);
      }
    });

    this.categoryService.getAllAttributeDescriptions().subscribe({
      next:(attributeDescription: AttributeDescription[]) =>{
        this.attributeDesList = attributeDescription;
      },
      error: (error) =>{
        console.error('Error fetching attribute descriptions:', error);
      }
    });
  }

  deleteFilters(){
    this.category.reset();
    this.attribute.reset();
    this.search.reset();
    this.description.reset();

    this.fitnessProgramService.getAll().subscribe({
      next: (programs: Program[]) => {
        this.programsArray = programs;
      },
      error: (error) => {
        console.error('Error fetching programs:', error);
      }
    });
  }

  filterByCategory(event:any){
    this.category = event.value;
  }

  filterByAttribute(event:any){
    this.attribute = event.value;
  }

  filterByDescription(event:any){
    this.description = event.value;
  }

  filterData(){
     console.log('filterData');
     const filter: Filter = {
      category: this.category.value,
      search: this.search.value,
      attribute: this.attribute.value,
      description: this.description.value
  };

  this.fitnessProgramService.getAllFiltered(filter).subscribe({
    next: (programs: Program[]) => {
      this.programsArray = programs;
    },
    error: (error) => {
      console.error('Error fetching programs:', error);
    }
  });

    // let filter: any = [];
    // if(this.search.value!==''){
    //   filter.push({key:'search', value: this.search.value});
    // }
    // if(this.attributeId.value!==''){
    //   filter.push({key:'attributeId', value: this.attributeId.value});
    // }
    // if(this.categoryId.value !== ''){
    //   filter.push({key: 'categoryId', value: this.categoryId.value});
    // }
    // this.fitnessProgramService.findAllByFilters(filter).subscribe({
    //   next: (data) => {
    //     this.programsArray = data;
    //   }, error: () => {
    //     console.log('error');
    //   }
    // });
  }

  addProgram(){
    console.log('otvori');
    const dialogRef = this.dialog.open(CreateFitnessDialogComponent, {
      width: '50%',
      panelClass: 'container-dialog',
      disableClose: false,
      data: {
        animal: 'panda',
      },
    });
  }

  onChange(){
    if(this.checked){
      this.userService.getAllMyPrograms(1).subscribe({
        next: (programs: Program[]) => {
          this.programsArray=programs;
        },
        error: (error: any) =>{
          console.error('Error fetching user programs:', error);
        }
      });
      this.search.disable();
      this.category.disable();
      this.attribute.disable();
      this.description.disable();
      this.isDisabledBtn=true;
    }else{
      this.fitnessProgramService.getAll().subscribe({
        next: (programs: Program[]) => {
          this.programsArray = programs;
        },
        error: (error: any) => {
          console.error('Error fetching programs:', error);
        }
      });
      this.search.enable();
      this.category.enable();
      this.attribute.enable();
      this.description.enable();
      this.isDisabledBtn=false;
    }
  }
  onDeleteProgram(program: any) {
    console.log('dodje li bar do eventa');
    this.programsArray = this.programsArray.filter(p => p !== program);
  }
}
