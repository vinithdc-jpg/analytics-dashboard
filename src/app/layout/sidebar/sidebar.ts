import { Component, EventEmitter, Input, Output, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService, AppRole } from '../../services/auth';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  @Input() isOpen = false;
  @Output() closeMenu = new EventEmitter<void>();

  private auth = inject(AuthService);

  navigationItems: {
    label: string;
    icon: string;
    route: string;
    roles: AppRole[];
  }[] = [
    {
      label: 'Dashboard',
      icon: '▦',
      route: '/dashboard',
      roles: ['Admin', 'Manager', 'Analyst'],
    },
    {
      label: 'Users',
      icon: '♙',
      route: '/users',
      roles: ['Admin', 'Manager'],
    },
    {
      label: 'Settings',
      icon: '⚙',
      route: '/settings',
      roles: ['Admin'],
    },
  ];

  visibleNavigationItems = computed(() =>
    this.navigationItems.filter((item) => this.auth.canAccess(item.roles)),
  );
}
