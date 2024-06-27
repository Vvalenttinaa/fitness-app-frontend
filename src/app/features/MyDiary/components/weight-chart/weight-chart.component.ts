import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-weight-chart',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, ReactiveFormsModule],
  templateUrl: './weight-chart.component.html',
  styleUrl: './weight-chart.component.css'
})
export class WeightChartComponent implements OnInit {

  @Input() data: { date: string, weight: number }[] = [];
  
  public lineChartData: ChartDataset[] = [
    {
      data: [],
      label: 'Weight'
    }
  ];

  public lineChartLabels: string[] = [];

  public lineChartOptions: ChartOptions = {
    responsive: true,
  };

  public lineChartLegend = true;
  public lineChartPlugins = [];
  public lineChartType: ChartType = 'line';

  constructor() { 
    console.log('konstruktor');
  }

  ngOnInit(): void {
    console.log('on init', this.data);

    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.updateChart();
    }
  }

  updateChart(): void {
    this.lineChartLabels = this.data.map(d => d.date);
    this.lineChartData[0].data = this.data.map(d => d.weight);
  }
  
}
