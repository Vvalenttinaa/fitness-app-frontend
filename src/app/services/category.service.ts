import {Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import Category from '../model/category.model';
import { HttpClient } from '@angular/common/http';
import { apiEndpoint } from '../constants/constants';
import { Attribute } from '../model/attribute.model';
import { AttributeDescription } from '../model/attributedescription.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  http: HttpClient = inject(HttpClient);

  getAll(): Observable<Category[]>{
    return this.http.get<Category[]>(`${apiEndpoint.CategoryEndpoint.getAll}`);
  }

  getAllAttributes(): Observable<Attribute[]>{
    return this.http.get<Attribute[]>(`${apiEndpoint.CategoryEndpoint.getAllAttributes}`);
  }

  getAllAttributeDescriptions(): Observable<AttributeDescription[]>{
    return this.http.get<AttributeDescription[]>(`${apiEndpoint.CategoryEndpoint.getAllAttributeDescriptions}`)
  }


  
  // categoryList!: Observable<Category[]>;

  // categories: Category[] = [
  //   {
  //     id: 1,
  //     name: 'kardio',
  //     attributes: [
  //       {
  //         id: 1,
  //         name: 'trcanje',
  //         categoryId: 1,
  //         attributeDescription: [
  //           {
  //             id: 1,
  //             description: '100m',
  //             attributeId: 1
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     name: 'tezinski',
  //     attributes: [
  //       {
  //         id: 2,
  //         name: 'teg',
  //         categoryId: 2,
  //         attributeDescription: [
  //           {
  //             id: 2,
  //             description: '10kg',
  //             attributeId: 2
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ];

  // constructor() { }

  // getAllCategories(): Observable<Category[]> {
  //   return of(this.categories);
  // }

  // getCategoryById(id: number): Observable<Category | undefined> {
  //   return of(this.categories.find(category => category.id === id));
  // }
}
