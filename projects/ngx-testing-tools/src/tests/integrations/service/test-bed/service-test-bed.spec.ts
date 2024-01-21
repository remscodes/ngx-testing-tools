import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { serviceTestBed } from '../../../../lib';
import { AppService } from '../../../fixtures/services/app.service';

describe('ServiceTestBed', () => {

  describe('instance', () => {
    serviceTestBed(AppService);
  });

  describe('import', () => {
    const tb = serviceTestBed(AppService, { checkCreate: false })
      .import(HttpClientTestingModule);

    it('should import', tb(({ injector }) => {
      expect(injector.get(HttpTestingController)).toBeTruthy();
    }));
  });

  describe('provide', () => {
    @Injectable()
    class SubService {}

    const tb = serviceTestBed(AppService, { checkCreate: false })
      .provide(SubService);

    it('should provide', tb(({ injector }) => {
      expect(injector.get(SubService)).toBeTruthy();
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

  describe('setup', () => {
    const tb = serviceTestBed(AppService, { checkCreate: false });

    beforeEach(tb.setup(({ service }) => {
      expect(service.info).toBeTrue();
    }));

    beforeEach(tb.setup(({ service }, done) => {
      service.info = false;
      done();
    }));

    it('should be true', tb(({ service }) => {
      expect(service.info).toBeFalse();
    }));
  });

  describe('async/await and DoneFn support', () => {
    const tb = serviceTestBed(AppService, { checkCreate: false });

    it('should support DoneFn', tb(({}, done) => {
      expect().nothing();
      done();
    }));

    it('should support async/await', tb(async () => {
      expect().nothing();
    }));
  });
});
