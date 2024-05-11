import { Component, Input, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Program } from '../../../../model/program.model';
import { ActivatedRoute } from '@angular/router';
import { ProgramService } from '../../../../services/program.service';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from '../../../../components/comments/comments.component';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ChoosePayDialogComponent } from '../../components/choose-pay-dialog/choose-pay-dialog.component';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule, CommentsComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  programService = inject(ProgramService);
  dialog = inject(MatDialog);

  fitnessProgram!: Program;


  constructor() {
    const fitnessProgramId = Number(this.route.snapshot.params['id']);
    this.programService.getById(fitnessProgramId).subscribe((program: any) => {
        this.fitnessProgram = program;
        console.log(this.fitnessProgram);
    });
  }

  joinProgram(){
    const dialogRef = this.dialog.open(ChoosePayDialogComponent, {
      // width: '50%',
      disableClose: false,
      data:{
        fitnessProgramId: this.fitnessProgram.id
      }
    });
  }
}
