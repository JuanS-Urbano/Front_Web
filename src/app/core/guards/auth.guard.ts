import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Session } from '../services/session';

export const authGuard: CanActivateFn = (route, state) => {
  const sessionService = inject(Session);
  const router = inject(Router);

  if (sessionService.isLoggedIn()) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
