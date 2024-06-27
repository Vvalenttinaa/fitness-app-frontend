import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ApiNinjasService } from '../../../services/api-ninjas.service';

@Component({
  selector: 'app-suggestions',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.css'
})
export class SuggestionsComponent {
  exercises: any[] = [];

  constructor(private apiNinjasService: ApiNinjasService) {}

  ngOnInit(): void {
    this.fetchExercises();
  }

  fetchExercises(): void {
    this.apiNinjasService.getExercises().subscribe((data: any) => {
      this.exercises = data.slice(0, 10);
    });
  }
}
