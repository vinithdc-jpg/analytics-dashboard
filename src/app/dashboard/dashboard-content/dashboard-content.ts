import { Component, computed, signal } from '@angular/core';

type Period = 'week' | 'month' | 'year';

@Component({
  selector: 'app-dashboard-content',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-content.html',
})
export class DashboardContent {
  // The selected reporting period
  selectedPeriod = signal<Period>('month');

  // Sample data for each reporting period
  private periodData: Record<
    Period,
    {
      totalUsers: number;
      revenue: number;
      activeSessions: number;
      conversionRate: number;
      userChange: string;
      revenueChange: string;
      sessionChange: string;
      conversionChange: string;
    }
  > = {
    week: {
      totalUsers: 3240,
      revenue: 185000,
      activeSessions: 840,
      conversionRate: 3.4,
      userChange: '+4.2%',
      revenueChange: '+2.1%',
      sessionChange: '+6.5%',
      conversionChange: '+0.8%',
    },
    month: {
      totalUsers: 12480,
      revenue: 842500,
      activeSessions: 2845,
      conversionRate: 4.86,
      userChange: '+12.8%',
      revenueChange: '+8.2%',
      sessionChange: '+5.4%',
      conversionChange: '+1.2%',
    },
    year: {
      totalUsers: 148200,
      revenue: 9850000,
      activeSessions: 18450,
      conversionRate: 5.2,
      userChange: '+24.5%',
      revenueChange: '+18.6%',
      sessionChange: '+14.2%',
      conversionChange: '+2.4%',
    },
  };

  // Automatically recalculates when selectedPeriod changes
  metrics = computed(() => {
    const data = this.periodData[this.selectedPeriod()];

    return [
      {
        title: 'Total Users',
        value: data.totalUsers.toLocaleString('en-IN'),
        change: data.userChange,
        icon: '♙',
      },
      {
        title: 'Revenue',
        value: `₹${data.revenue.toLocaleString('en-IN')}`,
        change: data.revenueChange,
        icon: '₹',
      },
      {
        title: 'Active Sessions',
        value: data.activeSessions.toLocaleString('en-IN'),
        change: data.sessionChange,
        icon: '◉',
      },
      {
        title: 'Conversion Rate',
        value: `${data.conversionRate}%`,
        change: data.conversionChange,
        icon: '↗',
      },
    ];
  });

  setPeriod(value: string): void {
    if (value === 'week' || value === 'month' || value === 'year') {
      this.selectedPeriod.set(value);
    }
  }
}
