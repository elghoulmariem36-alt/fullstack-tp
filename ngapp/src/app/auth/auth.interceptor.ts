import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const token = auth.token;

  // The token is only sent to our own API, never to other sites
  const toApi = req.url.startsWith(environment.apiUrl);
  const request =
    token && toApi ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      const isAuthCall = req.url.includes('/auth/');
      if (error.status === 401 && token && !isAuthCall) {
        auth.logout();
        router.navigate(['/login'], { queryParams: { expired: 1 } });
      }
      return throwError(() => error);
    }),
  );
};
