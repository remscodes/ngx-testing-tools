import { CanDeactivateFn } from '@angular/router';
import { of } from 'rxjs';

export function noBackGuard(): CanDeactivateFn<any> {
  return (component, currentRoute, currentState, nextState) => {
    return of(true);
  };
}
