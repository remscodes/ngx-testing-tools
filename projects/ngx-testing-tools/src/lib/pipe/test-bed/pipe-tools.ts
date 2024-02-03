import { assertInstance } from '../../common/assertion/assert-instance';
import { buildBaseTools } from '../../common/test-bed/base/base-tools';
import { PipeTools } from './models';
import { PipeTestBedFactory } from './pipe-test-bed-factory';

export function buildPipeTools<T>(factory: PipeTestBedFactory<T>): PipeTools<T> {
  const pipe: T = factory['instance'];
  assertInstance(pipe, factory['described']);

  const { injected, injector, rx } = buildBaseTools(factory);

  return { injected, injector, pipe, rx };
}
