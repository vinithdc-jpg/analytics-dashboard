import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  @Input() isOpen = false;
  @Output() closeMenu = new EventEmitter<void>();

  navigationItems = [
    { label: 'Dashboard', icon: '▦', href: '#dashboard' },
    { label: 'Users', icon: '♙', href: '#users' },
    { label: 'Analytics', icon: '▥', href: '#analytics' },
    { label: 'Settings', icon: '⚙', href: '#settings' },
  ];
}