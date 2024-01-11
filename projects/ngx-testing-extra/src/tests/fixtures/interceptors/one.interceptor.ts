import { HttpInterceptorFn } from '@angular/common/http';

export function oneInterceptor(): HttpInterceptorFn {
  return (req, next) => {
    return next(req.clone({ setHeaders: { 'x-test': 'test' } }));
  };
}
