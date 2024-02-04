import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorInterceptorConfig, SuccessInterceptorConfig } from '../common/tools/http/utils/models/interceptor-config.model';
import { mockErrorHandlerFnFactory, mockSuccessHandlerFnFactory } from './mocks/handler.mock';

export function makeInterceptorSucceed(interceptor: HttpInterceptorFn, config: SuccessInterceptorConfig = {}): Observable<HttpRequest<unknown>> {
  const { url = '/test', method = 'GET' } = config;
  const req = new HttpRequest<unknown>(method, url, null);

  return interceptor(req, mockSuccessHandlerFnFactory()) as any;
}

export function makeInterceptorFail(interceptor: HttpInterceptorFn, config: ErrorInterceptorConfig = {}): Observable<HttpRequest<unknown>> {
  const { url = '/test', status = 500 } = config;
  const req = new HttpRequest<unknown>('GET', url);
  const err = new HttpErrorResponse({ url, status });

  return interceptor(req, mockErrorHandlerFnFactory(err)) as any;
}
