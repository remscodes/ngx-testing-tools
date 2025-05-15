import { buildBaseTools } from '../../common/tools/base/base-tools';
import { buildHttpTools } from '../../common/tools/http/http-tools';
import { HttpOptions } from '../../common/tools/http/models/http-options.model';
import { HttpTools } from '../../common/tools/http/models/http-tools.model';
import { ResolverProxy } from '../proxy/resolver-proxy';
import { ResolverTestBedFactory } from '../resolver-test-bed-factory';
import { ResolverTools } from './models';
import { TriggerTools } from './trigger/models/trigger-tools.model';
import { buildTriggerTools } from './trigger/trigger-tools';

export function buildResolverTools<T>(factory: ResolverTestBedFactory<T>, httpOptions: HttpOptions): ResolverTools<T> {
  const resolverProxy: ResolverProxy = factory['instance'];
  const resolver: T = resolverProxy.instance;

  const { injected, injector, rx } = buildBaseTools(factory);
  const http: HttpTools = buildHttpTools(injector, httpOptions);
  const trigger: TriggerTools<unknown> = buildTriggerTools(resolverProxy, injector);

  return { resolver, trigger, http, injected, injector, rx };
}
