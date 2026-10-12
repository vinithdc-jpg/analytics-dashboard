import { Component, Input, OnChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import {
  ChartConfiguration,
  ChartData,
} from 'chart.js';

type Period = 'week' | 'month' | 'year';

@Component({
  selector: 'app-activity-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './activity-chart.html',
})

export class ActivityChart implements OnChanges {
  @Input() period: Period = 'month';

  lineChartType = 'line' as const;

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [],
  };

  private activityData: Record<
    Period,
    {
      labels: string[];
      activeUsers: number[];
      newUsers: number[];
    }
  > = {
    week: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      activeUsers: [120, 150, 135, 190, 175, 220, 205],
      newUsers: [25, 35, 28, 42, 38, 50, 44],
    },
    month: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      activeUsers: [620, 780, 710, 940],
      newUsers: [140, 180, 165, 230],
    },
    year: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      activeUsers: [2100, 2450, 2300, 2800, 3150, 3500],
      newUsers: [480, 560, 510, 640, 720, 810],
    },
  };

  ngOnChanges(): void {
    const data = this.activityData[this.period];

    this.lineChartData = {
      labels: data.labels,
      datasets: [
        {
          label: 'Active Users',
          data: data.activeUsers,
          borderColor: '#7c3aed',
          backgroundColor: 'rgba(124, 58, 237, 0.12)',
          fill: true,
          tension: 0.35,
          pointRadius: 4,
        },
        {
          label: 'New Users',
          data: data.newUsers,
          borderColor: '#0d9488',
          backgroundColor: 'rgba(13, 148, 136, 0.08)',
          fill: false,
          tension: 0.35,
          pointRadius: 4,
        },
      ],
    };
  }
}