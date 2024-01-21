import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { serviceTestBed } from 'ngx-testing-tools';
import { AppService, CatFact } from './app.service';

describe('AppService', () => {
  const tb = serviceTestBed(AppService)
    .provide([provideHttpClient(), provideHttpClientTesting()])
    .inject('httpController', HttpTestingController)
    .inject('destroyRef', DestroyRef);

  tb.compileEach();
  tb.shouldCreate();

  afterEach(tb.setup(({ injected: { httpController } }) => {
    httpController.verify();
  }));

  it('should fetch cat fact', tb(({ service, injected: { httpController, destroyRef } }, done: DoneFn) => {
    const mockRes: CatFact = { fact: 'string', length: 6 };

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
  }));
});
