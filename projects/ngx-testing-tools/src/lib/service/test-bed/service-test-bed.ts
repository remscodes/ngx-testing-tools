import { Type } from '@angular/core';
import { HttpOptions } from '../../common/test-bed/http/models/http-options.model';
import { doneFactory } from '../../common/test-bed/jasmine-done';
import { mergeFactoryToTestBed } from '../../common/test-bed/merge-factory';
import { postAsync } from '../../common/util/post-async';
import { Nullable } from '../../shared.model';
import { ServiceTestBed, ServiceTestBedOptions, ServiceTools } from './models';
import { ServiceExtraOptions } from './models/service-extra-options.model';
import { ServiceCallback } from './models/service-test-bed.model';
import { ServiceTestBedFactory } from './service-test-bed-factory';
import { buildServiceTools } from './service-tools';

export function serviceTestBed<T>(rootService: Type<T>, options: ServiceTestBedOptions = {}): ServiceTestBed<T> {
  const {
    httpTesting = false,
    verifyHttp: globalVerifyHttp,
  } = options;

  const httpOptions: HttpOptions = { httpTesting };

  const factory = new ServiceTestBedFactory(rootService, options);

  const tb: ServiceTestBed<T> = ((assertion: ServiceCallback<T, any>, opts: ServiceExtraOptions = {}) => {
    const { verifyHttp = globalVerifyHttp ?? true } = opts;

    const assertionWrapper = (done: Nullable<DoneFn>) => {
      const tools: ServiceTools<T> = buildServiceTools(factory, httpOptions);

      const postTest = () => {
        if (httpTesting && verifyHttp) tools.http.controller.verify();
        tools.rx['cleanAll']();
      };

      return (done)
        ? assertion(tools, doneFactory(done, postTest))
        : postAsync(assertion(tools, null!), postTest);
    };

    return (assertion.length > 1)
      ? (done: DoneFn) => assertionWrapper(done)
      : () => assertionWrapper(null);
  }) as ServiceTestBed<T>;

  return mergeFactoryToTestBed(factory, tb) as ServiceTestBed<T>;
}
