import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { interceptorTestBed } from '../../../lib';
import { validateHeader } from '../../fixtures/helpers/validators/validate-http-header';

describe('InterceptorTestBed', () => {

  @Injectable()
  class AuthStore {}

  describe('with class', () => {
    @Injectable()
    class OneInterceptor implements HttpInterceptor {
      constructor(public authStore: AuthStore) {}

      public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req.clone({ setHeaders: { 'x-header': 'my-value' } }));
      }
    }

    const tb = interceptorTestBed(OneInterceptor)
      .provide(AuthStore);

    it('should interceptor be an instance', tb(({ interceptor }) => {
      expect(typeof interceptor === 'object').toBeTrue();
    }));

    it('should set custom header', tb(({ inspect, rx }, done) => {
      const req = new HttpRequest('GET', '/test');
      validateHeader(req.headers, { name: 'x-header', value: null });

      rx.remind = inspect.request(req).subscribe({
        next: ({ headers }) => {
          validateHeader(headers, { name: 'x-header', value: 'my-value' });
          done();
        },
      });
    }));

    it('should ', tb(({ rx, inspect }, done) => {
      const res = new HttpResponse({});

      rx.remind = inspect.successResponse(res).subscribe({
        next: (value) => {
          expect(value).toBeInstanceOf(HttpResponse);
          done();
        },
      });
    }));

    it('should ', tb(({ rx, inspect }, done) => {
      const err = new HttpErrorResponse({});

      rx.remind = inspect.errorResponse(err).subscribe({
        error: (value) => {
          expect(value).toBeInstanceOf(HttpErrorResponse);
          done();
        },
      });
    }));
  });

  describe('with fn', () => {
    function oneInterceptor(): HttpInterceptorFn {
      return (req, next) => {
        inject(AuthStore);
        return next(req.clone({ setHeaders: { 'x-header': 'my-value' } }));
      };
    }

    const tb = interceptorTestBed(oneInterceptor())
      .provide(AuthStore);

    it('should interceptor be a function', tb(({ interceptor }) => {
      expect(typeof interceptor === 'function').toBeTrue();
    }));

    it('should set custom header', tb(({ inspect, rx }, done) => {
      const req = new HttpRequest('GET', '/test');
      validateHeader(req.headers, { name: 'x-header', value: null });

      rx.remind = inspect.request(req).subscribe({
        next: ({ headers }) => {
          validateHeader(headers, { name: 'x-header', value: 'my-value' });
          done();
        },
      });
    }));
  });
});
