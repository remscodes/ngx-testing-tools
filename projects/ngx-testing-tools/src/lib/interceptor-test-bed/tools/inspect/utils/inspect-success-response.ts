import { HttpEvent, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mockSuccessResponseHandlerFactory } from './handlers/mock-success-response-handler';

export function inspectSuccessResponse(interceptor: HttpInterceptor, resOrUrl: HttpResponse<unknown> | string, body: any = null): Observable<HttpEvent<any>> {
  const res: HttpResponse<unknown> = (resOrUrl instanceof HttpResponse)
    ? resOrUrl
    : new HttpResponse({ url: resOrUrl, body, status: 200 });

  const req = new HttpRequest('GET', (typeof resOrUrl === 'string') ? resOrUrl : '/test');

  return interceptor.intercept(req, mockSuccessResponseHandlerFactory(res));
}
