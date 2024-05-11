import { Injectable } from '@angular/core';
import { Attribute } from '../model/attribute.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  // attributes: Attribute[] = [
  //   {
  //     id: 1,
  //     name: 'trcanje',
  //     categoryId: 1,
  //     attributeDescription: [
  //       {
  //         id: 1,
  //         description: '100m',
  //         attributeId: 1
  //       }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     name: 'brzi hod',
  //     categoryId: 1,
  //     attributeDescription: [
  //       {
  //         id: 1,
  //         description: '1000m',
  //         attributeId: 2
  //       }
  //     ]
  //   }
  // ];

  // constructor() { }

  // getAllAttributes(): Observable<Attribute[]> {
  //   return of(this.attributes);
  // }

  // getAttributeById(id: number): Observable<Attribute | undefined> {
  //   return of(this.attributes.find(a => a.id === id));
  // }
}
