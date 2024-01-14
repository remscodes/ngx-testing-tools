import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mockErrorHandlerFnFactory, mockSuccessHandlerFnFactory } from './mocks/handler.mock';
import { ErrorInterceptorConfig, SuccessInterceptorConfig } from './models/interceptor-config.model';

export function makeInterceptorSucceed(interceptor: HttpInterceptorFn, config?: SuccessInterceptorConfig): Observable<HttpRequest<unknown>> {
  const req = new HttpRequest<unknown>(config?.method ?? 'GET' as any, config?.url ?? '/test');

  return interceptor(req, mockSuccessHandlerFnFactory()) as unknown as Observable<HttpRequest<unknown>>;
}

export function makeInterceptorFail(interceptor: HttpInterceptorFn, config?: ErrorInterceptorConfig): Observable<HttpRequest<unknown>> {
  const url: string = config?.url ?? '/test';

  const req = new HttpRequest<unknown>('GET', url);
  const err = new HttpErrorResponse({ url, status: config?.status ?? 500 });

  return interceptor(req, mockErrorHandlerFnFactory(err)) as unknown as Observable<HttpRequest<unknown>>;
}
