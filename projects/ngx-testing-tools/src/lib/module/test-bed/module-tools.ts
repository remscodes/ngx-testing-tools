import { buildBaseTools } from '../../common/test-bed/base/base-tools';
import { getInstance } from '../../common/test-bed/base/get-instance';
import { ModuleTools } from './models';
import { ModuleTestBedFactory } from './module-test-bed-factory';

export function buildModuleTools<T>(factory: ModuleTestBedFactory<T>): ModuleTools<T> {
  const module: T = getInstance(factory);
  const { injected, injector, rx } = buildBaseTools(factory);

  return { injected, injector, module, rx };
}
