import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';
import { buildRouteSnapshot, RouteSnapshotConfig } from '../route-snapshot';
import { DefaultGuardReturn, GuardReturn } from './models/guard.model';

export function challengeDeactivate<T, R extends GuardReturn = DefaultGuardReturn>(
  guard: CanDeactivateFn<T>,
  component: T,
  currentState: RouterStateSnapshot,
  nextState: RouterStateSnapshot,
  routeConfig?: RouteSnapshotConfig,
): R {
  const route: ActivatedRouteSnapshot = buildRouteSnapshot(routeConfig);
  return guard(component, route, currentState, nextState) as R;
}
