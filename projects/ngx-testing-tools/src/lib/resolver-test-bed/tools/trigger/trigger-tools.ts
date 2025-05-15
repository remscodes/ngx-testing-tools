import { Injector } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { buildRouteSnapshot, getRouterState, RouteSnapshotConfig } from '../../../common/utils/router.util';
import { ResolverProxy } from '../../proxy/resolver-proxy';
import { TriggerTools } from './models/trigger-tools.model';

export function buildTriggerTools(resolver: ResolverProxy, injector: Injector): TriggerTools<unknown> {
  const tools: TriggerTools<unknown> = () => {
    const route: ActivatedRouteSnapshot = buildRouteSnapshot();
    const state = getRouterState(injector);
    return resolver.resolve(route, state);
  };

  tools.withInfo = (config: RouteSnapshotConfig) => {
    const { data, params, queryParams } = config;
    const route: ActivatedRouteSnapshot = buildRouteSnapshot({ data, params, queryParams });
    const state = getRouterState(injector);
    return resolver.resolve(route, state);
  };

  return tools;
}
