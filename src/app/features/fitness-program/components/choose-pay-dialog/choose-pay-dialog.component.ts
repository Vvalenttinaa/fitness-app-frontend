
import { Component, EventEmitter, Inject, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import Status from '../../../../model/status.model';
import StatusRequest from '../../../../model/statusrequest.model';
import { MessageDialogService } from '../../../../services/message-dialog.service';
import { UserService } from '../../../../services/user.service';
import Card from '../../../../model/card.model';
import { min } from 'rxjs';
@Component({
  selector: 'app-choose-pay-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatIcon, MatInputModule, ReactiveFormsModule, FormsModule,MatCardModule, MatRadioModule, MatSelectModule, FormsModule, MatButton, MatFormFieldModule, MatError, MatInputModule],
  templateUrl: './choose-pay-dialog.component.html',
  styleUrl: './choose-pay-dialog.component.css',
})
export class ChoosePayDialogComponent {
  @Output() onCloseModel = new EventEmitter();

  route: ActivatedRoute = inject(ActivatedRoute);
  private builder = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ChoosePayDialogComponent>);
  private userService = inject(UserService);
  private messageDialogServie = inject(MessageDialogService);

  selectedOption: string = '';
  // cardNumber: string = '';
  fitnessProgramId!: number;
  cardNumberFormControl = new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]); 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
  ) {
    this.fitnessProgramId=data.fitnessProgramId;
  }

  onNext() {
    let status: StatusRequest = {
      userId: Number(localStorage.getItem('userId')),
      programId: this.fitnessProgramId,
      paid: true,
      paymentMethodId:0
    };

    if(this.selectedOption !== ''){
      if(this.selectedOption === 'card'){
        if(this.cardNumberFormControl.value == null){
          console.log('mark as touched');
          console.log('cardNumber length je 0');
          this.cardNumberFormControl.markAsTouched();
          return;
        }else if(this.cardNumberFormControl != null){
          let card: Card = {
            number: this.cardNumberFormControl.value
          }
          console.log('Insert card servis');
          console.log(status.userId, card.number);
          this.userService.insertCard(status.userId, card).subscribe(response => {
            console.log('Response:', response);
          }, error => {
            console.error('Error:', error);
          });
          status.paymentMethodId=1;
        }
      }else if(this.selectedOption==='payPal'){
        status.paymentMethodId=2;
      }else if(this.selectedOption==='personal'){
        status.paymentMethodId=3;
      }

        this.userService.startProgram(status.userId, status).subscribe({
          next: (status: Status) => {
            this.messageDialogServie.showMessageDialog('Registration to program "'+ '"', 
            'Welcome ' + status.userByUserId.firstName + '! \n You are now member of program "' + 
            status.programByProgramId.name + '", lead by instructor ' + status.programByProgramId.instructorName + '.');
          },
          error: (error: any) => {
            console.log('Error starting program...');
            this.messageDialogServie.showMessageDialog('Registration to program ',
              'Are you already member? Please try again or try later.'
            )
          },
        });
      this.dialogRef.close();
    }
  }

  onCancel(){
    this.dialogRef.close();
  }
}
