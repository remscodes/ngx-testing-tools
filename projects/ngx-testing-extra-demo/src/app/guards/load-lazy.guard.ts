import { CanMatchFn } from '@angular/router';
import { of } from 'rxjs';

export function loadLazyGuard(): CanMatchFn {
  return (route, segments) => {
    return of(true);
  };
}
