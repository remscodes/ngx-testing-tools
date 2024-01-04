import { CanActivateFn } from '@angular/router';
import { of } from 'rxjs';

export function loginGuard(): CanActivateFn {
  return (route, state) => {
    return of(true);
  };
}
