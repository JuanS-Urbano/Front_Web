import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Session } from '../services/session';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionService = inject(Session);
  const router = inject(Router);
  const session = sessionService.getSession();

  let clonedReq = req;
  if (session?.token) {
    clonedReq = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${session.token}`,
        'X-User-Email': session.email  // Retrocompatibilidad con servicios que leen el header directamente
      }
    });
  }

  return next(clonedReq).pipe(
    catchError((error: any) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        // Token expirado o inválido -> forzar logout y redirigir
        sessionService.logout();
        router.navigate(['/auth/login']);
      }
      return throwError(() => error);
    })
  );
};
