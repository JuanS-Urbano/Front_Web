import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Session } from '../services/session';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionService = inject(Session);
  const userEmail = sessionService.getUserEmail();

  if (userEmail) {
    const clonedReq = req.clone({
      setHeaders: {
        'X-User-Email': userEmail
      }
    });
    return next(clonedReq);
  }

  return next(req);
};
