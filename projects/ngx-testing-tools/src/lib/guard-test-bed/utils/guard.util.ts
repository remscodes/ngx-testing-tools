import { CanActivate, CanActivateChild, CanActivateChildFn, CanActivateFn, CanDeactivate, CanDeactivateFn, CanLoad, CanLoadFn, CanMatch, CanMatchFn } from '@angular/router';
import { InternalGuardCan } from '../models/guard-can.model';

export function isCanActivateGuard(guard: any, type: InternalGuardCan): guard is (CanActivateFn | CanActivate) {
  return (type === 'CanActivate')
    || (type === 'ctor' && !!guard.canActivate);
}

export function isCanActivateChildGuard(guard: any, type: InternalGuardCan): guard is (CanActivateChildFn | CanActivateChild) {
  return (type === 'CanActivateChild')
    || (type === 'ctor' && !!guard.canActivateChild);
}

export function isCanDeactivateGuard(guard: any, type: InternalGuardCan): guard is (CanDeactivateFn<unknown> | CanDeactivate<unknown>) {
  return (type === 'CanDeactivate')
    || (type === 'ctor' && !!guard.canDeactivate);
}

export function isCanLoadGuard(guard: any, type: InternalGuardCan): guard is (CanLoadFn | CanLoad) {
  return (type === 'CanLoad')
    || (type === 'ctor' && !!guard.canLoad);
}

export function isCanMatchGuard(guard: any, type: InternalGuardCan): guard is (CanMatchFn | CanMatch) {
  return (type === 'CanMatch')
    || (type === 'ctor' && !!guard.canMatch);
}
