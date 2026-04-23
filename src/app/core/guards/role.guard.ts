import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Session } from '../services/session';

export const roleGuard: CanActivateFn = (route, state) => {
  const sessionService = inject(Session);
  const router = inject(Router);

  const requiredRoles = route.data?.['roles'] as string[] | undefined;
  const userRole = sessionService.getUserRole();

  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  if (userRole && requiredRoles.includes(userRole)) {
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};
