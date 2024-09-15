import { Injectable } from '@angular/core';
import { CanLoad, CanLoadFn, Route } from '@angular/router';

@Injectable()
export class LoadGuard implements CanLoad {

  public canLoad(route: Route): boolean {
    return route.data?.['isAdmin'] ?? false;
  }
}

export const LOAD_GUARD: CanLoadFn = (route) => route.data?.['isAdmin'] ?? false;
