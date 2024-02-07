import { HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BodyType } from '../../../../common/tools/http/utils/models/success-response-config.model';
import { mockRequestHandlerFactory } from './handlers/mock-request-handler';

export function inspectRequest(interceptor: HttpInterceptor, reqOrUrl: HttpRequest<unknown> | string, url?: string, body: BodyType = null): Observable<HttpRequest<unknown>> {
  const req: HttpRequest<unknown> = (reqOrUrl instanceof HttpRequest)
    ? reqOrUrl
    : new HttpRequest(reqOrUrl, url!, body);

  return interceptor.intercept(req, mockRequestHandlerFactory()) as any;
}
