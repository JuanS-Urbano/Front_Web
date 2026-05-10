import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Session } from '../services/session';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionService = inject(Session);
  const session = sessionService.getSession();

  if (session?.token) {
    const clonedReq = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${session.token}`,
        'X-User-Email': session.email  // Retrocompatibilidad con servicios que leen el header directamente
      }
    });
    return next(clonedReq);
  }

  return next(req);
};
