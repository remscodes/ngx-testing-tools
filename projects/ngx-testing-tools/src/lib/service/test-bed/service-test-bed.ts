import { Type } from '@angular/core';
import { mergeFactoryToTestBed } from '../../common/test-bed/merge-factory';
import { ServiceTestBed } from './models';
import { ServiceAssertion } from './models/service-test-bed.model';
import { ServiceTestBedFactory } from './service-test-bed-factory';
import { buildServiceTools } from './service-tools';

export function serviceTestBed<T>(rootService: Type<T>): ServiceTestBed<T> {
  const factory = new ServiceTestBedFactory(rootService);

  const tb: ServiceTestBed<T> = ((assertion: ServiceAssertion<T, any>) => {
    return (assertion.length > 1)
      ? (done: DoneFn) => assertion(buildServiceTools(factory), done)
      : () => assertion(buildServiceTools(factory), null!);
  }) as ServiceTestBed<T>;

  return mergeFactoryToTestBed(factory, tb) as ServiceTestBed<T>;
}
