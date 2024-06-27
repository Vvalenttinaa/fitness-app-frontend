import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import StatisticRequest from '../../../model/statistic-request.model';
import Statistic from '../../../model/statistic.model';
import { MessageDialogService } from '../../../services/message-dialog.service';
import { StatisticService } from '../../../services/statistic.service';
import { WeightChartComponent } from '../components/weight-chart/weight-chart.component';


@Component({
  selector: 'app-my-diary',
  standalone: true,
  imports: [WeightChartComponent, MatError, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule, MatTableModule],
  templateUrl: './my-diary.component.html',
  styleUrl: './my-diary.component.css'
})
export class MyDiaryComponent implements OnInit {

  displayedColumns: string[] = ['date', 'description', 'result', 'weight', 'duration', 'intensity'];

  statisticService = inject(StatisticService);
  private builder = inject(FormBuilder);
  messageDialogService = inject(MessageDialogService);

  statistic: Statistic[] = [];
  chartData: { date: string, weight: number }[] = [];


  ngOnInit(): void {
    this.statisticService.getAll(Number(localStorage.getItem('userId'))).subscribe({
      next: (statistics: Statistic[]) => {
        this.statistic=statistics;
        this.chartData = this.prepareChartData(this.statistic);
      }
    });
  }

  prepareChartData(statistics: any[]): { date: string, weight: number }[] {
    return statistics.map(stat => ({
      date: stat.date,
      weight: stat.weight
    }));
  }

  statisticForm: FormGroup = this.builder.group({
    description: new FormControl<string | null>(null, [Validators.required, Validators.minLength(2)]),
    duration: new FormControl<string | null >(null, [Validators.required, Validators.max(10000)]),
    intensity: new FormControl<string|null>(null, [Validators.required]),
    result: new FormControl<string|null>(null, [Validators.required, Validators.max(3000)]),
    weight: new FormControl<string|null>(null, [Validators.required, Validators.max(300), Validators.min(1)])
  });
  
  addStatistic(){
    if(this.statisticForm.valid){
      const statisticReq: StatisticRequest = {
        description: this.statisticForm.get('description')?.value,
        duration: this.statisticForm.get('duration')?.value,
        intensity: this.statisticForm.get('intensity')?.value,
        result: this.statisticForm.get('result')?.value,
        weight: this.statisticForm.get('weight')?.value
      };

      console.log(statisticReq);

      this.statisticService.addStatistic(statisticReq, Number(localStorage.getItem('userId'))).subscribe({
        next: (res: Statistic) => {
          console.log('added: ', res);
          this.statistic.push(res);
          this.statistic = [...this.statistic];
        },
        error: (error: any) => {
          this.messageDialogService.showMessageDialog('Adding daily results ',
            'Have you already added daily results? If not, please try again or try later.'
          )
        },
        complete: () => {
          this.statisticService.getAll(Number(localStorage.getItem('userId'))).subscribe({
            next: (statistics: Statistic[]) => {
              this.statistic=statistics;
              this.chartData = this.prepareChartData(this.statistic);
            }
          });
        }
      });
      this.statisticForm.reset();
    }
    this.statisticForm.disable();
  }

  downloadStatistic(){
    this.statisticService.downloadResults(Number(localStorage.getItem('userId'))).subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
