import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { ErrorInterceptorConfig, SuccessInterceptorConfig } from '../../common/tools/http/utils/models/interceptor-config.model';

function mockSuccessHandlerFnFactory(): HttpHandlerFn {
  return (req: HttpRequest<unknown>) => of(req) as any;
}

export function makeInterceptorSucceed(interceptor: HttpInterceptorFn, config: SuccessInterceptorConfig = {}): Observable<HttpRequest<unknown>> {
  const { url = '/test', method = 'GET' } = config;
  const req = new HttpRequest<unknown>(method, url, null);

  return interceptor(req, mockSuccessHandlerFnFactory()) as any;
}

function mockErrorHandlerFnFactory(err: HttpErrorResponse): HttpHandlerFn {
  return () => throwError(() => err);
}

export function makeInterceptorFail(interceptor: HttpInterceptorFn, config: ErrorInterceptorConfig = {}): Observable<HttpRequest<unknown>> {
  const { url = '/test', status = 500 } = config;
  const req = new HttpRequest<unknown>('GET', url);
  const err = new HttpErrorResponse({ url, status });

  return interceptor(req, mockErrorHandlerFnFactory(err)) as any;
}
