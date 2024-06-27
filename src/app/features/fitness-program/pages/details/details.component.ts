import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CommentsComponent } from '../../../../components/comments/comments.component';
import { Program } from '../../../../model/program.model';
import { AuthService } from '../../../../services/auth.service';
import { ImageService } from '../../../../services/image.service.ts.service';
import { ProgramService } from '../../../../services/program.service';
import { ChoosePayDialogComponent } from '../../components/choose-pay-dialog/choose-pay-dialog.component';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule, CommentsComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  programService = inject(ProgramService);
  dialog = inject(MatDialog);
  imageService = inject(ImageService);
  authService = inject(AuthService);

  fitnessProgram!: Program;
  image: any | undefined;
  loggedIn: boolean = false;


  constructor() {
    const fitnessProgramId = Number(this.route.snapshot.params['id']);
    this.programService.getById(fitnessProgramId).subscribe((program: any) => {
        this.fitnessProgram = program;
        console.log(this.fitnessProgram);
    });
  }

  ngOnInit(): void {
      this.loggedIn = this.authService.isLoggedIn();
    
    // this.imageService.downloadImage(this.route.snapshot.params['id']).subscribe({
    //   next:(res:any) =>{
    //     this.image = res;
    //   }
    // });
  }

  getImage():string{
    return this.imageService.downloadImage(this.route.snapshot.params['id']);
  }

  joinProgram(){
    const dialogRef = this.dialog.open(ChoosePayDialogComponent, {
      disableClose: false,
      data:{
        fitnessProgramId: this.fitnessProgram.id
      }
    });
  }
}
