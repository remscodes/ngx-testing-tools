import { HttpErrorResponse, HttpEvent, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mockErrorResponseHandlerFactory } from './handlers/mock-error-response-handler';

export function inspectErrorResponse(interceptor: HttpInterceptor, resOrUrl: HttpErrorResponse | string, error?: any): Observable<HttpEvent<any>> {
  const res: HttpErrorResponse = (resOrUrl instanceof HttpErrorResponse)
    ? resOrUrl
    : new HttpErrorResponse({ url: resOrUrl, error, status: 500 });

  const req = new HttpRequest('GET', (typeof resOrUrl === 'string') ? resOrUrl : '/test');

  return interceptor.intercept(req, mockErrorResponseHandlerFactory(res));
}
