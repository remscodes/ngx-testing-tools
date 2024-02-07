import { HttpErrorResponse, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BodyRequestMethod, NoBodyRequestMethod } from '../../../../common/tools/http/utils/models/request-method.model';

export interface InpectTools {
  request(req: HttpRequest<unknown>): Observable<HttpRequest<unknown>>;

  request(method: NoBodyRequestMethod, url: string): Observable<HttpRequest<unknown>>;

  request(method: BodyRequestMethod, url: string, body: any): Observable<HttpRequest<unknown>>;

  successResponse(res: HttpResponse<unknown>): Observable<HttpEvent<unknown>>;

  successResponse(url: string, body: any): Observable<HttpEvent<unknown>>;

  errorResponse(res: HttpErrorResponse): Observable<HttpEvent<unknown>>;

  errorResponse(url: string, error: any): Observable<HttpEvent<unknown>>;
}
