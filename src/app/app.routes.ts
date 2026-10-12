import { Routes } from '@angular/router';
import { DashboardContent } from './dashboard/dashboard-content/dashboard-content';
import { UserManagement } from './dashboard/user-management/user-management';
import { Settings } from './pages/settings/settings';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardContent,
  },
  {
    path: 'users',
    component: UserManagement,
  },
  {
    path: 'settings',
    component: Settings,
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
