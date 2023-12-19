import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { DefaultGuardReturn, GuardReturn } from './models/guard.model';

export function challengeMatch<R extends GuardReturn = DefaultGuardReturn>(
  guard: CanMatchFn,
  route: Route,
  segments: UrlSegment[],
): R {
  return guard(route, segments) as R;
}
