import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TestBed } from '@angular/core/testing';
import { makeInterceptorFail, makeInterceptorSucceed } from 'ngx-testing-extra';
import { HEADER_KEY, HEADER_VALUE, tokenInterceptor } from './token.interceptor';

describe('tokenInterceptor', () => {
  let destroyRef: DestroyRef;

  beforeEach(() => {
    destroyRef = TestBed.inject(DestroyRef);
  });

  it('should create', () => {
    expect(tokenInterceptor()).toBeTruthy();
  });

  it('should succeed and put token value in header', (done: DoneFn) => {
    makeInterceptorSucceed(tokenInterceptor())
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe({
        next: ({ headers }: HttpRequest<unknown>) => {
          expect(headers.get(HEADER_KEY)).toEqual(HEADER_VALUE);
          done();
        },
      });
  });

  it('should failed and', (done: DoneFn) => {
    makeInterceptorFail(tokenInterceptor())
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe({
        error: ({ status }: HttpErrorResponse) => {
          expect(status).toEqual(500);
          done();
        },
      });
  });
});
