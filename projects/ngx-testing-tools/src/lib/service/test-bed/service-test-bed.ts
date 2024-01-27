import { Type } from '@angular/core';
import { buildJasmineCallback } from '../../common/test-bed/action-callback';
import { mergeFactoryToTestBed } from '../../common/test-bed/merge-factory';
import { ServiceTestBed, ServiceTestBedOptions } from './models';
import { ServiceCallback } from './models/service-test-bed.model';
import { ServiceTestBedFactory } from './service-test-bed-factory';
import { buildServiceTools } from './service-tools';

export function serviceTestBed<T>(rootService: Type<T>, options: ServiceTestBedOptions = {}): ServiceTestBed<T> {
  const factory = new ServiceTestBedFactory(rootService, options);

  const tb: ServiceTestBed<T> = ((assertion: ServiceCallback<T, any>) => {
    return buildJasmineCallback(factory, assertion, buildServiceTools);
  }) as ServiceTestBed<T>;

  return mergeFactoryToTestBed(factory, tb) as ServiceTestBed<T>;
}
