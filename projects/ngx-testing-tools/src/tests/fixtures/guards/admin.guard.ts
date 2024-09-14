import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, CanActivateChildFn } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivateChild {

  public canActivateChild(childRoute: ActivatedRouteSnapshot): boolean {
    return (childRoute.data['isAdmin'] === true);
  }
}

export const ADMIN_GUARD: CanActivateChildFn = (childRoute) => (childRoute.data['isAdmin'] === true);
