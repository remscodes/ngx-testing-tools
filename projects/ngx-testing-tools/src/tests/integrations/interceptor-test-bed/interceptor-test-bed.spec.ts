import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { interceptorTestBed } from '../../../lib';

function oneInterceptor(): HttpInterceptorFn {
  return (req, next) => next(req.clone({ setHeaders: { 'x-test': 'test' } }));
}

@Injectable()
class OneInterceptor implements HttpInterceptor {

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone({ setHeaders: { 'x-test': 'test' } }));
  }
}

describe('InterceptorTestBed', () => {

  describe('with class', () => {
    const tb = interceptorTestBed(OneInterceptor);

    it('should ', tb(({ interceptor }) => {
      console.log(interceptor);
    }));
  });

  describe('with fn', () => {
    const tb = interceptorTestBed(oneInterceptor());

    it('should ', tb(({ interceptor }) => {
      console.log(interceptor);
    }));
  });
});
