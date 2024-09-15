import { Injectable } from '@angular/core';
import { CanMatch, CanMatchFn, Route } from '@angular/router';

@Injectable()
export class MatchGuard implements CanMatch {

  public canMatch(route: Route): boolean {
    return route.data?.['isAdmin'] ?? false;
  }
}

export const MATCH_GUARD: CanMatchFn = (route) => route.data?.['isAdmin'] ?? false;
