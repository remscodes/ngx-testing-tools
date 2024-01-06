import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { of, throwError } from 'rxjs';

export function mockSuccessHandlerFnFactory(): HttpHandlerFn {
  return (req: HttpRequest<unknown>) => of(req) as any;
}

export function mockErrorHandlerFnFactory(err: HttpErrorResponse): HttpHandlerFn {
  return () => throwError(() => err);
}
