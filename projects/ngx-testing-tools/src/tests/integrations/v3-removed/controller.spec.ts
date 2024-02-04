import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TestBed } from "@angular/core/testing";
import { emitFakeErrorResponse, emitFakeSuccessResponse, expectHttpRequest } from '../../../lib';

describe('HTTP responses', () => {
  let http: HttpClient;
  let httpController: HttpTestingController;
  let destroyRef: DestroyRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });

    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
    destroyRef = TestBed.inject(DestroyRef);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should emitFakeSuccessResponse', (done: DoneFn) => {
    http
      .get('/')
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe({
        next: (value) => {
          expect(value).toEqual(1);
          done();
        },
      });

    emitFakeSuccessResponse(httpController, {
      url: '/',
      method: 'GET',
      body: 1,
    });
  });

  it('should emitFakeErrorResponse', (done: DoneFn) => {
    http
      .get('/')
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe({
        error: ({ status }: HttpErrorResponse) => {
          expect(status).toEqual(401);
          done();
        },
      });

    emitFakeErrorResponse(httpController, {
      url: '/',
      method: 'GET',
      status: 401,
    });
  });

  it('should expectHttpRequest', (done: DoneFn) => {
    http
      .get('/')
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe();

    expectHttpRequest(httpController, {
      url: '/',
      method: 'GET',
    });

    expect().nothing();
    done();
  });
});
