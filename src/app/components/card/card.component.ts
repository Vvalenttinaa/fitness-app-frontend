import { Component, EventEmitter, Input, NgModule, Output, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Program } from '../../model/program.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { error } from 'console';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButton, MatIcon],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  userService: UserService = inject(UserService);
  constructor( private router:Router){
  }

  @Input() fitnessProgram!: Program;
  @Input() myProgram!: boolean;
  @Output() deleteProgram = new EventEmitter<void>();


  openDetails(programId: number) {
    this.router.navigate(['details/',  programId]);
  }

  onDelete(event:MouseEvent) {
    event.stopPropagation();
    this.userService.deleteProgram(1, this.fitnessProgram.id).subscribe({
      next: (res: any) => {
        console.log('Uspješno brisanje');
        this.deleteProgram.emit();
      },
      error: error => {
        console.log('Greška prilikom brisanja', error);
      }
    });
  }
}
