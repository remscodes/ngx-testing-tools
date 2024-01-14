import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { GuardReturn } from './models/guard.model';

export function challengeGuardMatch<R extends GuardReturn = boolean>(
  guard: CanMatchFn,
  route: Route,
  segments: UrlSegment[],
): R {
  return guard(route, segments) as R;
}
