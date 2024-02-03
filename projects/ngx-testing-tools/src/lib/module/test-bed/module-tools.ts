import { assertInstance } from '../../common/assertion/assert-instance';
import { buildBaseTools } from '../../common/test-bed/base/base-tools';
import { ModuleTools } from './models';
import { ModuleTestBedFactory } from './module-test-bed-factory';

export function buildModuleTools<T>(factory: ModuleTestBedFactory<T>): ModuleTools<T> {
  const module: T = factory['instance'];
  assertInstance(module, factory['described']);

  const { injected, injector, rx } = buildBaseTools(factory);

  return { injected, injector, module, rx };
}
