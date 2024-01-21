import { CanDeactivateFn } from '@angular/router';
import { of } from 'rxjs';

export function noBackGuard<T>(): CanDeactivateFn<T> {
  return () => of(true);
}
