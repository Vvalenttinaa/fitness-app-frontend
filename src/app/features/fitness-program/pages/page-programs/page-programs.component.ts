import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { CardComponent } from '../../../../components/card/card.component';
import { Attribute } from '../../../../model/attribute.model';
import { AttributeDescription } from '../../../../model/attributedescription.model';
import Category from '../../../../model/category.model';
import Filter from '../../../../model/filter.model';
import { Program } from '../../../../model/program.model';
import { CategoryService } from '../../../../services/category.service';
import { ProgramService } from '../../../../services/program.service';
import { UserService } from '../../../../services/user.service';
import { CreateFitnessDialogComponent } from '../../components/create-fitness-dialog/create-fitness-dialog.component';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-page-programs',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    CardComponent,
    MatInputModule,
    MatIcon,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    MatFormField,
    MatButtonModule,
    MatOptionModule,
    CommonModule,
  ],
  templateUrl: './page-programs.component.html',
  styleUrl: './page-programs.component.css',
})
export class PageProgramsComponent {
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
  authService: AuthService = inject(AuthService);

  public programsArray: Array<Program> = [];
  private dialog = inject(MatDialog);

  checked = false;
  isDisabledBtn: boolean = false;
  loggedIn: boolean = false;


  totalPages: number = 0;
  pageSize: number = 5;
  currentPage: number = 0;
  userId!: number;

  ngOnInit(): void {

    const id = this.getUserIdFromLocalStorage();
    if(id != null){
      this.userId = id;

    }

    this.loggedIn = this.authService.isLoggedIn();

    // this.loadPrograms();
    this.filterData();

    this.categoryService.getAll().subscribe({
      next: (category: Category[]) => {
        this.categoryList = category;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });

    this.categoryService.getAllAttributes().subscribe({
      next: (attribute: Attribute[]) => {
        this.attributeList = attribute;
      },
      error: (error) => {
        console.error('Error fetching attributes:', error);
      },
    });

    this.categoryService.getAllAttributeDescriptions().subscribe({
      next: (attributeDescription: AttributeDescription[]) => {
      //  this.attributeDesList = attributeDescription;
      const uniqueDescriptionsMap = new Map<string, AttributeDescription>();

    attributeDescription.forEach(description => {
      uniqueDescriptionsMap.set(description.description, description);
    });

    this.attributeDesList = Array.from(uniqueDescriptionsMap.values());
    for(let i=0; i<this.attributeDesList.length; i++){
      console.log(this.attributeDesList[i]);
    }

      },
      error: (error) => {
        console.error('Error fetching attribute descriptions:', error);
      },
    });
  }

  private getUserIdFromLocalStorage(): number | null {
    if (typeof localStorage !== 'undefined') {
      const userId = localStorage.getItem('userId');
      return userId ? Number(userId) : null;
    }
    return null;
  }

  // loadPrograms(): void {
  //   this.fitnessProgramService
  //     .getAll(this.currentPage, this.pageSize)
  //     .subscribe({
  //       next: (res: any) => {
  //         this.programsArray = res.content;
  //         console.log(this.programsArray);
  //         this.totalPages = res.totalPages;
  //       },
  //       error: (error) => {
  //         console.error('Error fetching programs:', error);
  //       },
  //     });
  // }

  deleteFilters() {
    this.category.reset();
    this.attribute.reset();
    this.search.reset();
    this.description.reset();

    // this.loadPrograms();
    this.totalPages=0;
    this.pageSize=5;
    this.filterData();
  }

  filterByCategory(event: any) {
    this.category = event.value;
  }

  filterByAttribute(event: any) {
    console.log('chosen' + event);
    this.attribute = event.value;
  }

  filterByDescription(event: any) {
    this.description = event.value;
  }

  filterData() {
    const filter: Filter = {
      category: this.category.value,
      search: this.search.value,
      attribute: this.attribute.value,
      description: this.description.value,
    };

    console.log('pozivam za ', this.currentPage, this.pageSize, filter.category, filter.attribute, filter.description);

    this.fitnessProgramService
      .getAllFiltered(filter, this.currentPage, this.pageSize)
      .subscribe({
        next: (res: any) => {
          this.programsArray = res.content;
          console.log(this.programsArray);
          this.totalPages = res.totalPages;
        },
        error: (error) => {
          console.error('Error fetching programs:', error);
        },
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

  addProgram() {
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

  onChange() {
    if (this.checked) {
      this.userService.getAllMyPrograms(this.userId).subscribe({
        next: (programs: Program[]) => {
          this.programsArray = programs;
        },
        error: (error: any) => {
          console.error('Error fetching user programs:', error);
        },
      });
      this.search.disable();
      this.category.disable();
      this.attribute.disable();
      this.description.disable();
      this.isDisabledBtn = true;
    } else {
      this.fitnessProgramService.getAll(this.currentPage, this.pageSize).subscribe({
        next: (programs: any) => {
          this.programsArray = programs.content;
        },
        error: (error: any) => {
          console.error('Error fetching programs:', error);
        },
      });
      this.search.enable();
      this.category.enable();
      this.attribute.enable();
      this.description.enable();
      this.isDisabledBtn = false;
    }
  }
  onDeleteProgram(program: any) {
    this.programsArray = this.programsArray.filter((p) => p !== program);
  }

  onPageChange(event: PageEvent): void {
    console.log(this.currentPage, this.pageSize);
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    console.log(this.currentPage, this.pageSize);
    this.filterData();
  }
}
