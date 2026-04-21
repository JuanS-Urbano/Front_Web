import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SessionService } from '../services/session.service';

/**
 * Guard de roles.
 *
 * Restringe acceso según el rol del usuario (ADMIN, EDITOR, LECTOR).
 * Se usa en las rutas que requieren un rol específico.
 *
 * Ejemplo de uso en rutas:
 * { path: 'admin', canActivate: [roleGuard], data: { roles: ['ADMIN'] } }
 */
export const roleGuard: CanActivateFn = (route, state) => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  const requiredRoles = route.data?.['roles'] as string[] | undefined;
  const userRole = sessionService.getUserRole();

  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  if (userRole && requiredRoles.includes(userRole)) {
    return true;
  }

  // TODO: redirigir a página de "Sin permisos" o mostrar mensaje 403
  router.navigate(['/dashboard']);
  return false;
};
