import { buildCustomTools } from '../../common/test-bed/custom-tools';
import { ModuleTools } from './models/module-tools.model';
import { ModuleTestBedFactory } from './module-test-bed-factory';

export function buildModuleTools<T>(factory: ModuleTestBedFactory<T>): ModuleTools<T> {
  const module: T = factory['module'];
  const { injected, injector } = buildCustomTools(factory);

  return { injected, injector, module };
}
