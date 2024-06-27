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
import { ProgramRequest } from '../model/program-request.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  fitnessCategoryService: CategoryService = inject(CategoryService);
  fitnessAttributeService: AttributeService = inject(AttributeService);
  http: HttpClient = inject(HttpClient);

  // getAll(): Observable<Program[]>{
  //   return this.http.get<Program[]>(`${apiEndpoint.ProgramEndpoint.getAll}`);
  // }

  getAll(page: number, size: number): Observable<any>{
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${apiEndpoint.ProgramEndpoint.getAll}`, { params });
  }

  getById(id:number): Observable<Program>{
    const url = `${apiEndpoint.ProgramEndpoint.getById}`.replace(':id', id.toString());
    return this.http.get<Program>(url);
  }

  getAllFiltered(filter: Filter, page: number, size: number): Observable<Program[]> {
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
    params = params.set('page', page);
    params = params.set('size', size);
    console.log(params);
    
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

   insertProgram(program: ProgramRequest): Observable<Program>{
    return this.http.post<Program>(apiEndpoint.ProgramEndpoint.insertProgram, program);
   }
}
