import { buildBaseTools } from '../../common/tools/base/base-tools';
import { DirectiveTestBedFactory } from '../directive-test-bed-factory';
import { DirectiveTools } from './models';

export function buildDirectiveTools<T>(factory: DirectiveTestBedFactory<T>): DirectiveTools<T> {
  const directive: T = factory['instance'];
  const { injected, injector, rx } = buildBaseTools(factory);

  return { injected, injector, directive, rx };
}
