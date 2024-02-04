import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TestBed } from '@angular/core/testing';
import { makeInterceptorFail, makeInterceptorSucceed } from '../../../lib';
import { oneInterceptor } from '../../fixtures/interceptors/one.interceptor';

describe('Interceptors', () => {
  const interceptor: HttpInterceptorFn = oneInterceptor();
  let destroyRef: DestroyRef;

  beforeEach(() => {
    destroyRef = TestBed.inject(DestroyRef);
  });

  it('should makeInterceptorSucceed', (done: DoneFn) => {
    makeInterceptorSucceed(interceptor)
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe({
        next: ({ headers }: HttpRequest<unknown>) => {
          expect(headers.get('x-test')).toEqual('test');
          done();
        },
      });
  });

  it('should makeInterceptorFail', (done: DoneFn) => {
    makeInterceptorFail(interceptor, { status: 401 })
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe({
        error: ({ status }: HttpErrorResponse) => {
          expect(status).toEqual(401);
          done();
        },
      });
  });

  it('should makeInterceptorFail with status 500', (done: DoneFn) => {
    makeInterceptorFail(interceptor)
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe({
        error: ({ status }: HttpErrorResponse) => {
          expect(status).toEqual(500);
          done();
        },
      });
  });
});
