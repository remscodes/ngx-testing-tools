import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { serviceTestBed } from '../../../../lib';
import { AppService } from '../../../fixtures/services/app.service';

describe('ServiceTestBed', () => {

  describe('instance', () => {
    serviceTestBed(AppService);
  });

  describe('async/await and DoneFn support', () => {
    const tb = serviceTestBed(AppService, { checkCreate: false });

    it('should support async/await', tb(async ({ service }) => {
      expect(service).toBeTruthy();
    }));

    it('should support DoneFn', tb(({ service }, done) => {
      expect(service).toBeTruthy();
      done();
    }));
  });

  describe('setup', () => {
    const tb = serviceTestBed(AppService, { checkCreate: false });

    beforeEach(tb.setup(({ service }) => expect(service.info).toBeTrue()));
    beforeEach(tb.setup(async ({ service }) => expect(service.info).toBeTrue()));
    beforeEach(tb.setup(({ service }, done) => {
      service.info = false;
      done();
    }));

    it('should be false', tb(({ service }) => {
      expect(service.info).toBeFalse();
    }));
  });

  describe('import by method', () => {
    const tb = serviceTestBed(AppService, { checkCreate: false })
      .import(HttpClientTestingModule);

    it('should work', tb(({ injector }) => {
      expect(() => injector.get(HttpTestingController)).not.toThrowError();
    }));
  });

  describe('import by config', () => {
    const tb = serviceTestBed(AppService, {
      checkCreate: false,
      imports: [HttpClientTestingModule],
    });

    it('should work', tb(({ injector }) => {
      expect(() => injector.get(HttpTestingController)).not.toThrowError();
    }));
  });

  describe('provide by method', () => {
    @Injectable()
    class SubService {}

    const tb = serviceTestBed(AppService, { checkCreate: false })
      .provide(SubService);

    it('should work', tb(({ injector }) => {
      expect(() => injector.get(SubService)).not.toThrowError();
    }));
  });

  describe('provide by config', () => {
    @Injectable()
    class SubService {}

    const tb = serviceTestBed(AppService, {
      checkCreate: false,
      providers: [SubService],
    });

    it('should work', tb(({ injector }) => {
      expect(() => injector.get(SubService)).not.toThrowError();
    }));
  });

  describe('inject', () => {
    @Injectable()
    class SubService {}

    const tb = serviceTestBed(AppService, { checkCreate: false })
      .provide(SubService)
      .inject('sub', SubService);

    it('should inject', tb(({ injected: { sub } }) => {
      expect(sub).toBeTruthy();
    }));
  });

  describe('http tools', () => {
    const tb = serviceTestBed(AppService, {
      checkCreate: false,
      httpTesting: true,
    });

    it('should controller work', tb(({ http }, done) => {
      http.client.get('/test').subscribe({
        next: (value) => {
          expect(value).toEqual(1);
          done();
        },
      });

      http.controller
        .expectOne('/test')
        .flush(1);
    }));

    it('should emitSuccessResponse work', tb(({ http }, done) => {
      http.client.get('/test').subscribe({
        next: (value) => {
          expect(value).toEqual(1);
          done();
        },
      });

      http.emitSuccessResponse({ url: '/test', method: 'GET', body: 1 });
    }));

    it('should emitErrorResponse work', tb(({ http }, done) => {
      http.client.get('/test').subscribe({
        error: () => {
          expect().nothing();
          done();
        },
      });

      http.emitErrorResponse({ url: '/test', method: 'GET' });
    }));
  });

  describe('unusable http tools', () => {
    const tb = serviceTestBed(AppService, { checkCreate: false });

    it('should throw', tb(({ http }) => {
      expect(() => http.client)
        .toThrowError('Cannot use `http.client` because HttpTools is not initialized. You need to set `httpTesting:true` into the test bed options.');
    }));

    it('should throw', tb(({ http }) => {
      expect(() => http.controller)
        .toThrowError('Cannot use `http.controller` because HttpTools is not initialized. You need to set `httpTesting:true` into the test bed options.');
    }));

    it('should throw', tb(({ http }) => {
      expect(() => http.emitSuccessResponse({ method: 'GET', url: '', body: {} }))
        .toThrowError('Cannot use `http.emitSuccessResponse` because HttpTools is not initialized. You need to set `httpTesting:true` into the test bed options.');
    }));

    it('should throw', tb(({ http }) => {
      expect(() => http.emitErrorResponse({ method: 'GET', url: '' }))
        .toThrowError('Cannot use `http.emitErrorResponse` because HttpTools is not initialized. You need to set `httpTesting:true` into the test bed options.');
    }));
  });
});
