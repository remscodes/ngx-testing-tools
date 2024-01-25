import { buildCustomTools } from '../../common/test-bed/custom-tools';
import { assertModule } from './assertions/assert-module';
import { ModuleTools } from './models';
import { ModuleTestBedFactory } from './module-test-bed-factory';

export function buildModuleTools<T>(factory: ModuleTestBedFactory<T>): ModuleTools<T> {
  const module: T = factory['module'];
  assertModule(module);

  const { injected, injector } = buildCustomTools(factory);

  return { injected, injector, module };
}
