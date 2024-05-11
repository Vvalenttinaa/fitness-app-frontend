import { Component, OnInit, inject } from '@angular/core';
import FitnessNews from '../../../../model/fitnessnews.model';
import { NewsService } from '../../../../services/news.service';
import { error } from 'console';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  
  newsList: FitnessNews[]=[];
  newsService: NewsService = inject(NewsService);

  ngOnInit(): void {
    this.newsService.getAll().subscribe({
      next: (news: FitnessNews[]) => {
        this.newsList = news;
      },
      error: (error: any) => {
        console.log('error fetching fitness news' + error);
      }
    })
  }
  
}
