import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, CanActivateChildFn } from '@angular/router';

@Injectable()
export class ActivateChildGuard implements CanActivateChild {

  public canActivateChild(childRoute: ActivatedRouteSnapshot): boolean {
    return (childRoute.data['isAdmin'] === true);
  }
}

export const ACTIVATE_CHILD_GUARD: CanActivateChildFn = (childRoute) => (childRoute.data['isAdmin'] === true);
