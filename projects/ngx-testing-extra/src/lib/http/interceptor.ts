import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mockErrorHandlerFnFactory, mockSuccessHandlerFnFactory } from './mocks/handler.mock';
import { ErrorInterceptorConfig, SuccessInterceptorConfig } from './models/interceptor-config.model';

export function makeInterceptorSucceed(interceptor: HttpInterceptorFn, config?: SuccessInterceptorConfig): Observable<HttpEvent<unknown>> {
  const req: HttpRequest<unknown> = new HttpRequest(config?.method ?? 'GET' as any, config?.url ?? '/test');
  return interceptor(req, mockSuccessHandlerFnFactory());
}

export function makeInterceptorFail(interceptor: HttpInterceptorFn, config?: ErrorInterceptorConfig): Observable<HttpEvent<unknown>> {
  const req: HttpRequest<unknown> = new HttpRequest('GET', config?.url ?? '/test');
  const err: HttpErrorResponse = new HttpErrorResponse({
    url: config?.url ?? '/test',
    status: config?.status ?? 500,
  });
  return interceptor(req, mockErrorHandlerFnFactory(err));
}
