import { CommonModule, JsonPipe } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import MessageRequest from '../../../../model/message-request.model';
import Message from '../../../../model/message.model';
import { User } from '../../../../model/user.model';
import { MessageDialogService } from '../../../../services/message-dialog.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [ JsonPipe, CommonModule, MatTooltipModule, MatIcon, MatExpansionModule, MatFormFieldModule, MatSelectModule, MatOptionModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit {
  clickedNew: boolean = false;
  userService: UserService = inject(UserService);
  messageService: MessageDialogService = inject(MessageDialogService);
  dialogRef = inject (MatDialogRef<MessageComponent>);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  messageForm!: FormGroup;
  recipients: Array<User> = [];
  messages: Array<Message> = [];
  
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

    this.userService.getMessages(Number(localStorage.getItem('userId'))).subscribe({
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
      senderId: Number(localStorage.getItem('userId')),
      receiverId: this.messageForm.get('recipient')?.value
    };

    this.userService.sendMessage(Number(localStorage.getItem('userId')), message).subscribe({
      next: (message: Message) => {
        console.log('sent' + message);
        this.messageService.showMessageDialog("Message sent!", "Successfully sent messsage!");        
      },
      error: (error: Error) =>{
        console.log('Error sending message '+ error);
        this.messageService.showMessageDialog("Message is not sent!", "Unsuccessfully sent messsage!");

      }
    });
    this.dialogRef.close();
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
