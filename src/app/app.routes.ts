import { Routes } from '@angular/router';
import { DashboardContent } from './dashboard/dashboard-content/dashboard-content';
import { UserManagement } from './dashboard/user-management/user-management';
import { Settings } from './pages/settings/settings';
import { roleGuard } from './guards/role.guard';
import { AppRole } from './services/auth';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardContent,
    canActivate: [roleGuard],
    data: { roles: ['Admin', 'Manager', 'Analyst'] as AppRole[] },
  },
  {
    path: 'users',
    component: UserManagement,
    canActivate: [roleGuard],
    data: { roles: ['Admin', 'Manager'] as AppRole[] },
  },
  {
    path: 'settings',
    component: Settings,
    canActivate: [roleGuard],
    data: { roles: ['Admin'] as AppRole[] },
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
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // Always keep the wildcard route last.
  { path: '**', component: NotFound },
];
