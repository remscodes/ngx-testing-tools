import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';
import { buildRouteSnapshot, RouteSnapshotConfig } from '../route-snapshot';
import { GuardReturn } from './models/guard.model';

export function challengeGuardDeactivate<T, R extends GuardReturn = boolean>(
  guard: CanDeactivateFn<T>,
  component: T,
  currentState: RouterStateSnapshot,
  nextState: RouterStateSnapshot,
  routeConfig?: RouteSnapshotConfig,
): R {
  const route: ActivatedRouteSnapshot = buildRouteSnapshot(routeConfig);
  return guard(component, route, currentState, nextState) as R;
}
