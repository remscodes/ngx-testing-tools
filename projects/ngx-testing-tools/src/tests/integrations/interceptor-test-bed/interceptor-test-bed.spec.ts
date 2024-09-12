import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { interceptorTestBed, itShouldCreateInterceptor } from '../../../lib';
import { validateHeader } from '../../fixtures/helpers/validators/validate-http-header';

@Injectable()
class Store {}

@Injectable()
class OneInterceptor implements HttpInterceptor {

  public constructor(
    public store: Store,
  ) { }

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req.clone({ setHeaders: { 'x-custom-header': 'my-value' } })).pipe(tap({}));
  }
}

function oneInterceptor(): HttpInterceptorFn {
  return (req, next) => {
    inject(Store);
    return next(req.clone({ setHeaders: { 'x-custom-header': 'my-value' } }));
  };
}

describe('itShouldCreateInterceptor', () => {

  describe('with class', () => {
    itShouldCreateInterceptor(OneInterceptor, { providers: [Store] });
  });

  describe('with fn', () => {
    itShouldCreateInterceptor(oneInterceptor());
  });
});

describe('interceptorTestBed', () => {

  describe('with class', () => {
    const tb = interceptorTestBed(OneInterceptor)
      .provide(Store);

    it('should interceptor be an instance', tb(({ interceptor }) => {
      expect(typeof interceptor === 'object').toBeTrue();
    }));

    describe('inspect request', () => {

      it('with HttpRequest', tb(({ inspect, rx }, done) => {
        const req = new HttpRequest('GET', '/test');
        validateHeader(req.headers, { name: 'x-custom-header', value: null });

        rx.remind = inspect.request(req).subscribe({
          next: ({ headers }) => {
            validateHeader(headers, { name: 'x-custom-header', value: 'my-value' });
            done();
          },
        });
      }));

      it('with method and url', tb(({ inspect, rx }, done) => {
        rx.remind = inspect.request('GET', '/test').subscribe({
          next: ({ headers }) => {
            validateHeader(headers, { name: 'x-custom-header', value: 'my-value' });
            done();
          },
        });
      }));
    });

    describe('inspect success response', () => {

      it('with HttpResponse', tb(({ rx, inspect }, done) => {
        const res = new HttpResponse({ body: {} });

        rx.remind = inspect.successResponse(res).subscribe({
          next: (value) => {
            expect(value).toBeInstanceOf(HttpResponse);
            expect((value as HttpResponse<unknown>).body).toEqual({});
            done();
          },
        });
      }));

      it('with url and body', tb(({ rx, inspect }, done) => {
        rx.remind = inspect.successResponse('/test', {}).subscribe({
          next: (res) => {
            expect(res).toBeInstanceOf(HttpResponse);
            expect((res as HttpResponse<unknown>).body).toEqual({});
            done();
          },
        });
      }));
    });

    describe('inspect error response', () => {

      it('with HttpErrorResponse', tb(({ rx, inspect }, done) => {
        const err = new HttpErrorResponse({ error: 'Error' });

        rx.remind = inspect.errorResponse(err).subscribe({
          error: (value) => {
            expect(value).toBeInstanceOf(HttpErrorResponse);
            expect(value.error).toEqual('Error');
            done();
          },
        });
      }));

      it('with url and error', tb(({ rx, inspect }, done) => {
        rx.remind = inspect.errorResponse('/test', 'Error').subscribe({
          error: (err) => {
            expect(err).toBeInstanceOf(HttpErrorResponse);
            expect(err.error).toEqual('Error');
            done();
          },
        });
      }));
    });

    it('should update header with http tools', tb(({ http }, done) => {
      http.client.get('/test').subscribe({
        next: () => done(),
      });

      const req = http.controller.expectOne('/test');

      expect(req.request.headers.has('x-custom-header')).toBeTrue();

      req.flush({});
    }));
  });

  describe('with fn', () => {
    const tb = interceptorTestBed(oneInterceptor(), {
      providers: [Store],
      checkCreate: false,
    });

    it('should interceptor be a function', tb(({ interceptor }) => {
      expect(typeof interceptor === 'function').toBeTrue();
    }));

    it('should set custom header', tb(({ inspect, rx }, done) => {
      const req = new HttpRequest('GET', '/test');
      validateHeader(req.headers, { name: 'x-custom-header', value: null });

      rx.remind = inspect.request(req).subscribe({
        next: ({ headers }) => {
          validateHeader(headers, { name: 'x-custom-header', value: 'my-value' });
          done();
        },
      });
    }));

    it('should update header with http tools', tb(({ http }, done) => {
      http.client.get('/test').subscribe({
        next: () => done(),
      });

      const req = http.controller.expectOne('/test');

      expect(req.request.headers.has('x-custom-header')).toBeTrue();

      req.flush({});
    }));
  });
});
