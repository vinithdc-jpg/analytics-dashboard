import { Component, EventEmitter, Output, inject } from '@angular/core';
import { AuthService, AppRole } from '../../services/auth';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.html',
})
export class Topbar {
  @Output() menuToggle = new EventEmitter<void>();

  private auth = inject(AuthService);
  readonly role = this.auth.role;

  changeRole(value: string): void {
    if (value === 'Admin' || value === 'Manager' || value === 'Analyst') {
      this.auth.setRole(value as AppRole);
    }
  }
  isDemoRoleOpen = false
}