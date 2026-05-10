import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { map, take } from 'rxjs/operators';
import { Session } from '../services/session';

export const authGuard: CanActivateFn = (_route, _state) => {
  const sessionService = inject(Session);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // En SSR no hay localStorage: permitir renderizado inicial, el cliente redirigirá si hace falta
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  return sessionService.session$.pipe(
    take(1),
    map(session => {
      if (session !== null) {
        return true;
      }
      router.navigate(['/auth/login']);
      return false;
    })
  );
};
