import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Program } from '../../model/program.model';
import { ImageService } from '../../services/image.service.ts.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButton, MatIcon],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  userService: UserService = inject(UserService);
  imageService: ImageService = inject(ImageService);
  constructor( private router:Router){
  }

  @Input() fitnessProgram!: Program;
  @Input() myProgram!: boolean;
  @Output() deleteProgram = new EventEmitter<void>();


  openDetails(programId: number) {
    this.router.navigate(['details/',  programId]);
  }

  getImage(programId: number):string{
    return this.imageService.downloadImage(programId);
  }

  onDelete(event:MouseEvent) {
    event.stopPropagation();
    this.userService.deleteProgram(1, this.fitnessProgram.id).subscribe({
      next: (res: any) => {
        console.log('Deleted');
        this.deleteProgram.emit();
      },
      error: error => {
        console.log('Error', error);
      }
    });
  }
}
