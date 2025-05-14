import { Injector } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { getRouterState } from '../../../common/utils/router.util';
import { buildRouteSnapshot, RouteSnapshotConfig } from '../../../router/route-snapshot';
import { ResolverProxy } from '../../proxy/resolver-proxy';
import { InvokeTools } from './models/invoke-tools.model';

export function buildInvokeTools(resolver: ResolverProxy, injector: Injector): InvokeTools<unknown> {
  const tools: InvokeTools<unknown> = () => {
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
