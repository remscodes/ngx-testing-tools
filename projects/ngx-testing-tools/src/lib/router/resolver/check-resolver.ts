import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ResolveReturn } from '../models/resolver.models';
import { buildRouteSnapshot, RouteSnapshotConfig } from '../route-snapshot';

export function checkResolver<T, R extends ResolveReturn<T> = Observable<T>>(
  resolver: ResolveFn<T>,
  state: RouterStateSnapshot,
  routeConfig?: RouteSnapshotConfig,
): R {
  const route: ActivatedRouteSnapshot = buildRouteSnapshot(routeConfig);
  return resolver(route, state) as R;
}
