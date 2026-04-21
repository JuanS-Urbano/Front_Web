import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionService } from '../services/session.service';

/**
 * Interceptor de autenticación.
 *
 * Adjunta automáticamente el header 'X-User-Email' a todas las peticiones HTTP
 * cuando hay una sesión activa. Esto permite al backend identificar al usuario.
 *
 * Se registra en app.config.ts con: provideHttpClient(withInterceptors([authInterceptor]))
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionService = inject(SessionService);
  const userEmail = sessionService.getUserEmail();

  if (userEmail) {
    const clonedReq = req.clone({
      setHeaders: {
        'X-User-Email': userEmail
        // TODO: agregar header Authorization con JWT cuando se implemente seguridad
      }
    });
    return next(clonedReq);
  }

  return next(req);
};
