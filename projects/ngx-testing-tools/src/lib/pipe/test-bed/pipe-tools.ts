import { buildBaseTools } from '../../common/test-bed/base/base-tools';
import { getInstance } from '../../common/test-bed/base/get-instance';
import { PipeTools } from './models';
import { PipeTestBedFactory } from './pipe-test-bed-factory';

export function buildPipeTools<T>(factory: PipeTestBedFactory<T>): PipeTools<T> {
  const pipe: T = getInstance(factory);
  const { injected, injector, rx } = buildBaseTools(factory);

  return { injected, injector, pipe, rx };
}
