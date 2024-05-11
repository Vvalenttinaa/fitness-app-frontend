import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import Message from '../../../../model/message.model';
import { MatIcon } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { User } from '../../../../model/user.model';
import { UserService } from '../../../../services/user.service';
import MessageRequest from '../../../../model/message-request.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, MatIcon, MatExpansionModule, MatFormFieldModule, MatSelectModule, MatOptionModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit {
  clickedNew: boolean = false;
  userService: UserService = inject(UserService);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  messageForm!: FormGroup;
  recipients: Array<User> = [];
  messages: Array<Message> = [];
  
//   messages: Message[] = [
//     { id: 1, content: 'Prva poruka zovem da ti kazem mendeno moje sanjao sam noca s secne nas dvoje dodji i budi moja', dateAndTime: '2024-05-09 12:00', sender: 'Korisnik1', receiver: 'Korisnik2' },
//     { id: 2, content: 'Druga poruka', dateAndTime: '2024-05-09 12:05', sender: 'Korisnik2', receiver: 'Korisnik1' },
//     { id: 3, content: 'Treća poruka', dateAndTime: '2024-05-09 12:10', sender: 'Korisnik3', receiver: 'Korisnik2' }
// ];

  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      recipient: ['', Validators.required],
      content: ['', Validators.required]
    });

    this.userService.getAll().subscribe({
      next:(users:User[]) => {
        this.recipients=users;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });

    this.userService.getMessages(1).subscribe({
      next:(messages: Message[]) => {
        console.log(messages);
        this.messages=messages;
      },
      error: (error) => {
        console.error('Error fetching messages:', error);
      }
    })
  }

  sendMessage(): void {
    let message: MessageRequest = {
      content: this.messageForm.get('content')?.value,
      senderId: 1,
      receiverId: this.messageForm.get('recipient')?.value
    };

    this.userService.sendMessage(1, message).subscribe({
      next: (message: Message) => {
        console.log('sent' + message);
      },
      error: (error: Error) =>{
        console.log('Error sending message '+ error);
      }
    })
  }

  onClose(){
    this.dialog.closeAll();
  }

  clickedNewMess(){
    this.clickedNew = !this.clickedNew;
  }

  onRecipientChange(value: string) {
    this.messageForm.patchValue({ recipient: value });
  }
}
