import { Type } from '@angular/core';
import { mergeFactoryToTestBed } from '../../common/test-bed/merge-factory';
import { ServiceTestBed, ServiceTestBedOptions, ServiceTools } from './models';
import { ServiceExtraOptions } from './models/service-extra-options.model';
import { ServiceCallback } from './models/service-test-bed.model';
import { ServiceTestBedFactory } from './service-test-bed-factory';
import { buildServiceTools } from './service-tools';

export function serviceTestBed<T>(rootService: Type<T>, options: ServiceTestBedOptions = {}): ServiceTestBed<T> {
  const { httpTesting = false, verifyHttp: globalVerifyHttp } = options;

  const factory = new ServiceTestBedFactory(rootService, options);

  const tb: ServiceTestBed<T> = ((assertion: ServiceCallback<T, any>, opts: ServiceExtraOptions = {}) => {
    const { verifyHttp = globalVerifyHttp ?? true } = opts;

    const assertionWrapper = (done: DoneFn) => {
      const tools: ServiceTools<T> = buildServiceTools(factory);

      const implementation = assertion(tools, done);

      tools.rx.unsubscribe();
      tools.rx.complete();
      if (httpTesting && verifyHttp) tools.http.controller.verify();

      return implementation;
    };

    return (assertion.length > 1)
      ? (done: DoneFn) => assertionWrapper(done)
      : () => assertionWrapper(null!);
  }) as ServiceTestBed<T>;

  return mergeFactoryToTestBed(factory, tb) as ServiceTestBed<T>;
}
