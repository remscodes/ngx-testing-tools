import { assertInstance } from '../../assertion/assert-instance';
import { BaseTestBedFactory } from './base-test-bed-factory';

export function getInstance<T, F extends BaseTestBedFactory<T>>(factory: F): T {
  const instance: T = factory['instance'];
  assertInstance(instance, factory['described']);
  return instance;
}
