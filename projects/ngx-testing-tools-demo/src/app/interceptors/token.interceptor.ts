import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const HEADER_KEY: string = 'x-test';
export const HEADER_VALUE: string = 'token';

export function tokenInterceptor(): HttpInterceptorFn {
  return (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    return next(req.clone({ setHeaders: { [HEADER_KEY]: HEADER_VALUE } }));
  };
}
