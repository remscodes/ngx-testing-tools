import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { of } from 'rxjs';

export function loadLazyGuard(): CanMatchFn {
  return (route: Route, segments: UrlSegment[]) => {
    return of(true);
  };
}
