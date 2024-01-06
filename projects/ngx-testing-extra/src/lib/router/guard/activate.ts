import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { buildRouteSnapshot, RouteSnapshotConfig } from '../route-snapshot';
import { DefaultGuardReturn, GuardReturn } from './models/guard.model';

export function challengeActivate<R extends GuardReturn = DefaultGuardReturn>(
  guard: CanActivateFn,
  state: RouterStateSnapshot,
  routeConfig?: RouteSnapshotConfig,
): R {
  const route: ActivatedRouteSnapshot = buildRouteSnapshot(routeConfig);
  return guard(route, state) as R;
}
