import { Injectable, inject } from '@angular/core';
import StatusRequest from '../model/statusrequest.model';
import { Observable } from 'rxjs';
import Status from '../model/status.model';
import { HttpClient } from '@angular/common/http';
import { apiEndpoint } from '../constants/constants';
import { Program } from '../model/program.model';
import { User } from '../model/user.model';
import Message from '../model/message.model';
import MessageRequest from '../model/message-request.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http: HttpClient = inject(HttpClient);

  constructor() {}

  startProgram(id: number, status: StatusRequest): Observable<Status> {
    return this.http.post<Status>(
      apiEndpoint.UserEndpoint.startProgram + `/${id}/startProgram`,
      status,
    );
  }

  getAllMyPrograms(id: number): Observable<Program[]> {
    return this.http.get<Program[]>(
      `${apiEndpoint.UserEndpoint.getAllMyPrograms}`.replace(
        ':id',
        id.toString(),
      ),
    );
  }

  deleteProgram(idUser: number, idProgram: number): Observable<any> {
    const url = `http://localhost:8080/api/user/${idUser}/program/${idProgram}`;
    return this.http.delete(url);
  }

  getById(id:number): Observable<User>{
    const url = `${apiEndpoint.UserEndpoint.getById}`.replace(':id', id.toString());
    return this.http.get<User>(url);
  }

  getAll(): Observable<User[]>{
    return this.http.get<User[]>(`${apiEndpoint.UserEndpoint.getAll}`);
  }
  
  sendMessage(id:number, messageReq: MessageRequest): Observable<Message>{
    return this.http.post<Message>(
      apiEndpoint.UserEndpoint.sendMessage + `/${id}/sendMessage`,messageReq
    );
  }

  getMessages(id: number): Observable<Message[]>{
    const url = `${apiEndpoint.UserEndpoint.getMessages}`.replace(':id', id.toString());
    return this.http.get<Message[]>(url);
  }
}
