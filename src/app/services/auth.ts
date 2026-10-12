import { Injectable, computed, signal } from '@angular/core';

export type AppRole = 'Admin' | 'Manager' | 'Analyst';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Demo role only; this is not real authentication.
  private currentRole = signal<AppRole>('Admin');

  readonly role = this.currentRole.asReadonly();

  readonly isAdmin = computed(() => this.currentRole() === 'Admin');

  setRole(role: AppRole): void {
    this.currentRole.set(role);
  }

  canAccess(allowedRoles: readonly AppRole[]): boolean {
    return allowedRoles.includes(this.currentRole());
  }
}
