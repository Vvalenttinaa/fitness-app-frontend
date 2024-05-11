import { Component, EventEmitter, Inject, Output, ViewChild, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
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
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import StatusRequest from '../../../../model/statusrequest.model';
import Status from '../../../../model/status.model';
import { MessageDialogService } from '../../../../services/message-dialog.service';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-choose-pay-dialog',
  standalone: true,
  imports: [MatIcon, MatInputModule, ReactiveFormsModule, FormsModule,MatCardModule, MatRadioModule, MatSelectModule, FormsModule, MatButton, MatFormFieldModule, MatError, MatInputModule],
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
  cardNumber: string = '';
  fitnessProgramId!: number;
  cardNumberFormControl = new FormControl('', Validators.required); 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
  ) {
    this.fitnessProgramId=data.fitnessProgramId;
  }

  onNext() {
    let status: StatusRequest = {
      userId: 1,
      programId: this.fitnessProgramId,
      paid: true,
      paymentMethodId:0
    };

    if(this.selectedOption !== ''){
      if(this.selectedOption === 'card'){
        if(!this.cardNumber){
          console.log('mark as touched');
          this.cardNumberFormControl.markAsTouched();
          return;
        }else{
          //TO DO INsert karticu u user
          status.paymentMethodId=1;
        }
      }else if(this.selectedOption==='payPal'){
        status.paymentMethodId=2;
      }else if(this.selectedOption==='personal'){
        status.paymentMethodId=3;
      }

        this.userService.startProgram(1, status).subscribe({
          next: (status: Status) => {
            this.messageDialogServie.showMessageDialog('Registration to program "' + status.programByProgramId.name+ '"', 
            'Welcome ' + status.userByUserId.firstName + '! \n You are now member of program "' + 
            status.programByProgramId.name + '", lead by instructor ' + status.programByProgramId.instructorName + '.');
          },
          error: (error: any) => {
            console.log('Error posting comment...');
            this.messageDialogServie.showMessageDialog('Registration to program ',
              'Something went wrong. Please try again or try later.'
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
