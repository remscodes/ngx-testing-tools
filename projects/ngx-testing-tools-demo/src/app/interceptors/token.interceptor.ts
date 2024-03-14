import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { Store } from '../services/store.service';

export const HEADER_KEY: string = 'x-test';
export const HEADER_VALUE: string = 'token';

export function tokenInterceptor(): HttpInterceptorFn {
  return (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const store = inject(Store);
    return next(req.clone({ setHeaders: { [HEADER_KEY]: HEADER_VALUE } }))
      .pipe(tap({
        error: (err) => store.lastInterceptedError.set(err),
      }));
  };
}
