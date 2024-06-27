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

  getAllAttributeDescriptionsByAttributeId(id:number): Observable<AttributeDescription[]>{
    return this.http.get<AttributeDescription[]>(`${apiEndpoint.CategoryEndpoint.getAllAttributeDescriptionsByAttribute}`+ `/${id}` + `/description`);
  }

}