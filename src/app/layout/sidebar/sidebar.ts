import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  @Input() isOpen = false;
  @Output() closeMenu = new EventEmitter<void>();

  navigationItems = [
    { label: 'Dashboard', icon: '▦', route: '/dashboard' },
    { label: 'Users', icon: '♙', route: '/users' },
    { label: 'Settings', icon: '⚙', route: '/settings' },
  ];
}
