import { Component } from '@angular/core';
import { Sidebar } from './layout/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { Topbar } from './layout/topbar/topbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Sidebar, Topbar, RouterOutlet],
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