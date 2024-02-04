import { buildBaseTools } from '../../common/tools/base/base-tools';
import { ModuleTestBedFactory } from '../module-test-bed-factory';
import { ModuleTools } from './models';

export function buildModuleTools<T>(factory: ModuleTestBedFactory<T>): ModuleTools<T> {
  const module: T = factory['instance'];
  const { injected, injector, rx } = buildBaseTools(factory);

  return { injected, injector, module, rx };
}
