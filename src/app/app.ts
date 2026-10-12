import { Component } from '@angular/core';
import { Sidebar } from './layout/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { Topbar } from './layout/topbar/topbar';
import { DashboardContent } from './dashboard/dashboard-content/dashboard-content';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Sidebar, Topbar, DashboardContent, RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  sidebarOpen = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }
}