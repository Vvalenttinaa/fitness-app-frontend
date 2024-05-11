import { Injectable, inject } from '@angular/core';
import { Program } from '../model/program.model';
import  Comment  from '../model/comment.model';
import { Observable, of, switchMap } from 'rxjs';
import { CategoryService } from './category.service';
import { AttributeService } from './attribute.service';
import { Attribute } from '../model/attribute.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiEndpoint } from '../constants/constants';
import Filter from '../model/filter.model';
import CommentRequest from '../model/responses/comment-request.model';
import ReplyRequest from '../model/reply-request.model';
import Reply from '../model/reply.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  fitnessCategoryService: CategoryService = inject(CategoryService);
  fitnessAttributeService: AttributeService = inject(AttributeService);
  http: HttpClient = inject(HttpClient);

  getAll(): Observable<Program[]>{
    return this.http.get<Program[]>(`${apiEndpoint.ProgramEndpoint.getAll}`);
  }

  getById(id:number): Observable<Program>{
    const url = `${apiEndpoint.ProgramEndpoint.getById}`.replace(':id', id.toString());
    return this.http.get<Program>(url);
  }

  getAllFiltered(filter: Filter): Observable<Program[]> {
    let params = new HttpParams();
    if (filter.category) {
      params = params.set('category', filter.category);
    }
    if (filter.search) {
      params = params.set('search', filter.search);
    }
    if (filter.attribute) {
      params = params.set('attribute', filter.attribute);
    }
    if (filter.description) {
      params = params.set('description', filter.description);
    }
    return this.http.get<Program[]>(`${apiEndpoint.ProgramEndpoint.getAllSearch}`, { params });
  }

  getAllComments(programId: number): Observable<Comment[]>{
    const url = apiEndpoint.ProgramEndpoint.getAll + `/${programId}/comments`;
    return this.http.get<Comment[]>(url);
  }

  postComment(id:number, comment: CommentRequest): Observable<Comment>{
   // return this.http.post<Comment>(apiEndpoint.ProgramEndpoint.postComment + `/${comment.programmId}/comments`, comment);
   console.log(comment.programId);
    return this.http.post<Comment>(apiEndpoint.ProgramEndpoint.postComment + `/${id}/comments`, comment);
  }

  submitReply(id:number, reply: ReplyRequest): Observable<Reply>{
     return this.http.post<Reply>(apiEndpoint.ProgramEndpoint.postComment + `/${id}/comments/reply`, reply);
   }

  

  // getAllFitnessPrograms(): Observable<Program[]> {
  //   return of(this.fitnessList);
  // }

  // getFitnessProgramById(id: number): Observable<Program | undefined> {
  //   return of(this.fitnessList.find(fitnessProgram => fitnessProgram.id === id));
  // }

  // getAllCommentsForFitnessProgram(id: number): Observable<Comment[]> {
  //   console.log('Tražim sa id-jem ' + id);
  //   return of(this.commentsList.filter(comment => comment.programId === id));
  // }

  // getAllFitnessProgramsByCategoryId(categoryId: number): Observable<Program[]> {
  //   return this.fitnessCategoryService.getCategoryById(categoryId).pipe(
  //     switchMap(category => {
  //       if (category) {
  //         const categoryName = category.name;
  //         const filteredPrograms = this.fitnessList.filter(p => p.categoryName === categoryName);
  //         return of(filteredPrograms);
  //       } else {
  //         return of([]);
  //       }
  //     })
  //   );
  // }

  // getAllFitnessProgramsByAttributeId(attributeId: number): Observable<Program[]> {
  //   return this.fitnessAttributeService.getAttributeById(attributeId).pipe(
  //     switchMap((attribute: Attribute | undefined) => {
  //       if (attribute) {
  //         const attributeName = attribute.name;
  //         const filteredPrograms = this.fitnessList.filter(program => 
  //           program.categoryAttributes.some(categoryAttribute => categoryAttribute.id === attributeId)
  //         );
  //         return of(filteredPrograms);
  //       } else {
  //         return of([]);
  //       }
  //     })
  //   );
  // }

  // getAllFitnessProgramsBySearch(searchInput: string): Observable<Program[]>{
  //   return of(this.fitnessList.filter(program =>
  //     program.name.toLowerCase().includes(searchInput.toLowerCase()) ||
  //     program.categoryName.toLowerCase().includes(searchInput.toLowerCase()) ||
  //     program.categoryAttributes.some(attribute => attribute.name.toLowerCase().includes(searchInput.toLowerCase()))
  //   ));
  // }

  // findAllByFilters(filter: any): Observable<Program[]> {
  //   let filteredPrograms = this.fitnessList.filter(program => {
  //     if (filter.search && !this.checkProgramName(program, filter.search)) {
  //       return false;
  //     }
  //     if (filter.categoryId && program.categoryName !== filter.categoryId) {
  //       return false;
  //     }
  //     if (filter.attributeId) {
  //       let attributeFound = program.categoryAttributes.some(attribute => attribute.id === filter.attributeId);
  //       if (!attributeFound) {
  //         return false;
  //       }
  //     }
  //     return true;
  //   });
  //   console.log(filteredPrograms);
  //   return of(filteredPrograms);
  // }
  
  // // Pomoćna funkcija za proveru imena programa
  // private checkProgramName(program: Program, searchInput: string): boolean {
  //   return program.name.toLowerCase().includes(searchInput.toLowerCase());
  // }

  // fitnessList: Program[] = [
  //   {
  //     id: 1,
  //     name: 'Neki program',
  //     description: 'ovo je prviiii',
  //     price: 30.0,
  //     locationName:'online',
  //     level:1,
  //     duration:45,
  //     contact:'066767676',
  //     instructorName:'Bojan',
  //     categoryName:'kardio',
  //     images: [{
  //       id:1,
  //       name: 'dadada'
  //     }],
  //     categoryAttributes:[{
  //       id:1,
  //       name:'duzina',
  //       categoryId:1,
  //       attributeDescription:[{
  //         id:1,
  //         description:'100m',
  //         attributeId:1
  //       },
  //       {
  //         id:1,
  //         description:'sprint',
  //         attributeId:1
  //       }]
  //     }]
  //   },
  //   {
  //     id: 2,
  //     name: 'Prvi program',
  //     description: 'ovo je prviiii',
  //     price: 30.0,
  //     locationName:'online',
  //     level:1,
  //     duration:45,
  //     contact:'066767676',
  //     instructorName:'Bojan',
  //     categoryName:'kardio',
  //     images: [{
  //       id:1,
  //       name: 'dadada'
  //     }],
  //     categoryAttributes:[{
  //       id:1,
  //       name:'duzina',
  //       categoryId:1,
  //       attributeDescription:[{
  //         id:1,
  //         description:'string',
  //         attributeId:1
  //       }]
  //     }]
  //   },
  //   {
  //     id: 1,
  //     name: 'P',
  //     description: 'ovo je prviiii',
  //     price: 30.0,
  //     locationName:'online',
  //     level:1,
  //     duration:45,
  //     contact:'066767676',
  //     instructorName:'Bojan',
  //     categoryName:'tezinski',
  //     images: [{
  //       id:1,
  //       name: 'dadada'
  //     }],
  //     categoryAttributes:[{
  //       id:2,
  //       name:'brzi hod',
  //       categoryId:1,
  //       attributeDescription:[{
  //         id:1,
  //         description:'string',
  //         attributeId:1
  //       }]
  //     }]
  //   },
  //   {
  //     id: 1,
  //     name: 'Prvi program',
  //     description: 'ovo je prviiii',
  //     price: 30.0,
  //     locationName:'online',
  //     level:1,
  //     duration:45,
  //     contact:'066767676',
  //     instructorName:'Bojan',
  //     categoryName:'kardio',
  //     images: [{
  //       id:1,
  //       name: 'dadada'
  //     }],
  //     categoryAttributes:[{
  //       id:1,
  //       name:'duzina',
  //       categoryId:1,
  //       attributeDescription:[{
  //         id:1,
  //         description:'string',
  //         attributeId:1
  //       }]
  //     }]
  //   },
  //   {
  //     id: 1,
  //     name: 'Prvi program',
  //     description: 'ovo je prviiii',
  //     price: 30.0,
  //     locationName:'online',
  //     level:1,
  //     duration:45,
  //     contact:'066767676',
  //     instructorName:'Bojan',
  //     categoryName:'kardio',
  //     images: [{
  //       id:1,
  //       name: 'dadada'
  //     }],
  //     categoryAttributes:[{
  //       id:2,
  //       name:'brzi hod',
  //       categoryId:1,
  //       attributeDescription:[{
  //         id:1,
  //         description:'string',
  //         attributeId:1
  //       }]
  //     }]
  //   },
  //   {
  //     id: 1,
  //     name: 'Prvi program',
  //     description: 'ovo je prviiii',
  //     price: 30.0,
  //     locationName:'online',
  //     level:1,
  //     duration:45,
  //     contact:'066767676',
  //     instructorName:'Bojan',
  //     categoryName:'kardio',
  //     images: [{
  //       id:1,
  //       name: 'dadada'
  //     }],
  //     categoryAttributes:[{
  //       id:1,
  //       name:'duzina',
  //       categoryId:1,
  //       attributeDescription:[{
  //         id:1,
  //         description:'string',
  //         attributeId:1
  //       }]
  //     }]
  //   },
  //   {
  //     id: 1,
  //     name: 'Prvi program',
  //     description: 'ovo je prviiii',
  //     price: 30.0,
  //     locationName:'online',
  //     level:1,
  //     duration:45,
  //     contact:'066767676',
  //     instructorName:'Bojan',
  //     categoryName:'kardio',
  //     images: [{
  //       id:1,
  //       name: 'dadada'
  //     }],
  //     categoryAttributes:[{
  //       id:1,
  //       name:'duzina',
  //       categoryId:1,
  //       attributeDescription:[{
  //         id:1,
  //         description:'string',
  //         attributeId:1
  //       }]
  //     }]
  //   }
  // ]

  // commentsList: Comment[] = [
  //   {
  //     id: 1,
  //     content: 'komentar',
  //     username: 'korisnik1',
  //     programId: 1,
  //     replies: [
  //       {
  //         id: 1,
  //         content: 'odgovor na komentar',
  //         username: 'korisnik2'
  //       }
  //     ]
  //   }
  // ];
}
