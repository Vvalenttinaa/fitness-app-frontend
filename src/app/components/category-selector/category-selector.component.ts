import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../services/category.service';
import Category from '../../model/category.model';
import { CommonModule } from '@angular/common';
import { AttributeService } from '../../services/attribute.service';
import { Attribute } from '../../model/attribute.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-category-selector',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, CommonModule, MatButtonModule],
  templateUrl: './category-selector.component.html',
  styleUrl: './category-selector.component.css'
})
export class CategorySelectorComponent {
  @Output("onCategoryChange") onCategoryChange = new EventEmitter<number>();
  @Output("onAttributeChange") onAttributeChange = new EventEmitter<number>();
  @Output() deleteFiltersEvent = new EventEmitter<void>();

  @Input() 

  categoryService: CategoryService = inject(CategoryService);
  attributeService: AttributeService = inject(AttributeService);
  categoryList: Category[] = [];
  attributeList: Attribute[] = [];
  public selectedCategory: any; 
  public selectedAttribute: any;


  public onChange(event: any) {
      this.onCategoryChange.emit(event.value);
      console.log('emituje se dogadjaj iz selectora kategorije');
  }

  public onChangeAtt(event:any){
    this.onAttributeChange.emit(event.value); //emituje se dogadjaj tako da druge komponente mogu da dobiju vrijednost, ako prate dogadjaj
    console.log('emituje se dogadjaj iz selectora atributa');
  }

  deleteFilters(): void {
    this.selectedAttribute='';
    this.selectedCategory='';
    this.deleteFiltersEvent.emit();
  }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categoryList = categories;
    });

    this.attributeService.getAllAttributes().subscribe(attributes => {
      this.attributeList = attributes;
    });
    console.log(this.categoryList);
    console.log(this.attributeList);
  }
}
