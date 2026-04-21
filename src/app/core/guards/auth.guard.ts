import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SessionService } from '../services/session.service';

/**
 * Guard de autenticación.
 *
 * Protege rutas que requieren sesión activa.
 * Si el usuario no está autenticado, redirige a /auth/login.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  if (sessionService.isLoggedIn()) {
    return true;
  }

  // TODO: guardar la URL destino para redirigir después del login
  router.navigate(['/auth/login']);
  return false;
};
