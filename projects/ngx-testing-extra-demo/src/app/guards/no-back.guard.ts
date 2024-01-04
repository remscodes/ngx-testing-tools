import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';

export function noBackGuard<T>(): CanDeactivateFn<T> {
  return (
    component: T,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot,
  ) => {
    return of(true);
  };
}
