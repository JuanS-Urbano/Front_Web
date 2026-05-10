import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { map, take } from 'rxjs/operators';
import { Session } from '../services/session';

export const roleGuard: CanActivateFn = (route, _state) => {
  const sessionService = inject(Session);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  const requiredRoles = route.data?.['roles'] as string[] | undefined;

  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  // En SSR, localStorage no existe: permitir y dejar que el cliente re-evalúe tras hydration
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  return sessionService.session$.pipe(
    take(1),
    map(session => {
      const userRole = session?.rolSistema ?? null;
      if (userRole && requiredRoles.includes(userRole)) {
        return true;
      }
      router.navigate(['/dashboard']);
      return false;
    })
  );
};
