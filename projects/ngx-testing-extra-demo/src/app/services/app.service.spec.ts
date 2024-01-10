import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TestBed } from '@angular/core/testing';
import { AppService, CatFact } from './app.service';

describe('AppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  let service: AppService;
  beforeEach(() => service = TestBed.inject(AppService));

  let httpController: HttpTestingController;
  beforeEach(() => httpController = TestBed.inject(HttpTestingController));
  afterEach(() => httpController.verify());

  let destroyRef: DestroyRef;
  beforeEach(() => destroyRef = TestBed.inject(DestroyRef));

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch cat fact', (done: DoneFn) => {
    const mockRes: CatFact = {
      fact: 'string',
      length: 6,
    };

    service
      .getCatFact()
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe({
        next: ({ body, status }) => {
          expect(status).toEqual(200);
          expect(body).toEqual(mockRes);
          done();
        },
        error: fail,
      });

    httpController
      .expectOne(service.CAT_FACT_URL)
      .flush(mockRes);
  });
});
