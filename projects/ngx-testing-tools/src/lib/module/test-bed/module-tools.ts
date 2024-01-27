import { buildBaseTools } from '../../common/test-bed/base/base-tools';
import { assertModule } from './assertions/assert-module';
import { ModuleTools } from './models';
import { ModuleTestBedFactory } from './module-test-bed-factory';

export function buildModuleTools<T>(factory: ModuleTestBedFactory<T>): ModuleTools<T> {
  const module: T = factory['module'];
  assertModule(module);

  const { injected, injector, rx } = buildBaseTools(factory);

  return { injected, injector, module, rx: rx };
}
