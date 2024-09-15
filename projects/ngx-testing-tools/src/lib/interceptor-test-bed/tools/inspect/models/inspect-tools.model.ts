import { HttpErrorResponse, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BodyRequestMethod, NoBodyRequestMethod } from '../../../../common/tools/http/utils/models/request-method.model';

export interface InspectTools {
  /**
   * Inspect the passed request into the described interceptor.
   */
  request(req: HttpRequest<unknown>): Observable<HttpRequest<unknown>>;

  /**
   * Inspect the created request by method and url into the described interceptor.
   */
  request(method: NoBodyRequestMethod, url: string): Observable<HttpRequest<unknown>>;

  /**
   * Inspect the created request by method, url and body into the described interceptor.
   */
  request(method: BodyRequestMethod, url: string, body: any): Observable<HttpRequest<unknown>>;

  /**
   * Inspect the passed http response into the described interceptor.
   */
  successResponse(res: HttpResponse<unknown>): Observable<HttpEvent<unknown>>;

  /**
   * Inspect the created http response by url and body into the described interceptor.
   */
  successResponse(url: string, body: any): Observable<HttpEvent<unknown>>;

  /**
   * Inspect the passed http error response into the described interceptor.
   */
  errorResponse(res: HttpErrorResponse): Observable<HttpEvent<unknown>>;

  /**
   * Inspect the created http error response by url and error into the described interceptor.
   */
  errorResponse(url: string, error: any): Observable<HttpEvent<unknown>>;
}
