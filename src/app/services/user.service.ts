import { Injectable, inject } from '@angular/core';
import StatusRequest from '../model/statusrequest.model';
import { Observable } from 'rxjs';
import Status from '../model/status.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiEndpoint } from '../constants/constants';
import { Program } from '../model/program.model';
import { User } from '../model/user.model';
import Message from '../model/message.model';
import MessageRequest from '../model/message-request.model';
import EditUserRequest from '../model/edit-user-request.model';
import Card from '../model/card.model';

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
    console.log(id);
    if (id === undefined || id === null) {
      throw new Error('Invalid ID: ID cannot be undefined or null');
    }
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
    console.log('usao u get by id', id);
    const url = `${apiEndpoint.UserEndpoint.getById}`.replace(':id', id.toString());
    return this.http.get<User>(url);
  }

  getUserById(id:number): Observable<User>{
    const url = `${apiEndpoint.UserEndpoint.getUserById}`.replace(':id', id.toString());
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

  editProfile(id: number, userEdit: EditUserRequest): Observable<User>{
    console.log('editing profile...')
    return this.http.put<User>(
      apiEndpoint.UserEndpoint.editProfile + `/${id}/details`, userEdit
    );
  }

  // insertCard(id:number, card: Card): Observable<Boolean>{
  //   return this.http.post<Boolean>(
  //     apiEndpoint.UserEndpoint.insertCard +  `/${id}/insertCard`, card
  //   );
  // }

  insertCard(id: number,card: Card): Observable<Boolean>
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('Sending request to:', `${apiEndpoint.UserEndpoint.insertCard}/${id}/insertCard`, card);
    return this.http.post<Boolean>(`${apiEndpoint.UserEndpoint.insertCard}/${id}/insertCard`, card, { headers: headers });
  }

  getMessages(id: number): Observable<Message[]>{
    const url = `${apiEndpoint.UserEndpoint.getMessages}`.replace(':id', id.toString());
    return this.http.get<Message[]>(url);
  }

  getProgramStatus(userId: number, programId: number): Observable<Status>{
    const url = `${apiEndpoint.UserEndpoint.getProgramStatus}` + `/${userId}/program/${programId}/status`
    return this.http.get<Status>(url);
  }
}
