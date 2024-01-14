import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { buildRouteSnapshot, RouteSnapshotConfig } from '../route-snapshot';
import { GuardReturn } from './models/guard.model';

export function challengeGuardActivate<R extends GuardReturn = boolean>(
  guard: CanActivateFn,
  state: RouterStateSnapshot,
  routeConfig?: RouteSnapshotConfig,
): R {
  const route: ActivatedRouteSnapshot = buildRouteSnapshot(routeConfig);
  return guard(route, state) as R;
}
