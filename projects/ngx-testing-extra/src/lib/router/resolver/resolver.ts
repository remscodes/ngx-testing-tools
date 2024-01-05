import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { DefaultResolverReturn, ResolveReturn } from '../models/resolver.models';
import { buildRouteSnapshot, RouteSnapshotConfig } from '../route-snapshot';

export function checkResolver<T, R extends ResolveReturn<T> = DefaultResolverReturn<T>>(resolver: ResolveFn<T>,
  state: RouterStateSnapshot,
  routeConfig?: RouteSnapshotConfig,
): R {
  const route: ActivatedRouteSnapshot = buildRouteSnapshot(routeConfig);
  return resolver(route, state) as R;
}
