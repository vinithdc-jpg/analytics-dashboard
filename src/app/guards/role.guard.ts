import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, AppRole } from '../services/auth';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const allowedRoles = route.data['roles'] as AppRole[] | undefined;

  if (!allowedRoles || auth.canAccess(allowedRoles)) {
    return true;
  }

  // Send unauthorized users back to the dashboard
  return router.createUrlTree(['/dashboard']);
};
