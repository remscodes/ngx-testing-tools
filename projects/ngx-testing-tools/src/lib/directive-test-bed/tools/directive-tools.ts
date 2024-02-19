import { buildBaseTools } from '../../common/tools/base/base-tools';
import { buildRendererTools } from '../../common/tools/renderer/renderer-tools';
import { DirectiveTestBedFactory } from '../directive-test-bed-factory';
import { DirectiveTools } from './models';

export function buildDirectiveTools<T, H>(factory: DirectiveTestBedFactory<T, H>): DirectiveTools<T, H> {
  const directive: T = factory['instance'];

  const { action, element, fixture, host, query } = buildRendererTools(factory);
  const { injected, injector, rx } = buildBaseTools(factory, { thisInjector: fixture.debugElement.injector });

  return { action, directive, element, fixture, host, injected, injector, query, rx };
}
