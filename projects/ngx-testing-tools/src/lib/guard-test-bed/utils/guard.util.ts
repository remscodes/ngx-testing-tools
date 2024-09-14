import { CanActivate, CanActivateChild, CanActivateChildFn, CanActivateFn, CanDeactivate, CanDeactivateFn, CanLoad, CanLoadFn, CanMatch, CanMatchFn } from '@angular/router';
import { InternalGuardCan } from '../models/guard-can.model';

export function isCanActivateGuard(guard: any, type: InternalGuardCan): guard is (CanActivateFn | CanActivate) {
  return (type === 'CanActivate')
    || (type === 'ctor' && !!guard.prototype.canActivate);
}

export function isCanActivateChildGuard(guard: any, type: InternalGuardCan): guard is (CanActivateChildFn | CanActivateChild) {
  return (type === 'CanActivateChild')
    || (type === 'ctor' && !!guard.prototype.canActivateChild);
}

export function isCanDeactivateGuard(guard: any, type: InternalGuardCan): guard is (CanDeactivateFn<unknown> | CanDeactivate<unknown>) {
  return (type === 'CanDeactivate')
    || (type === 'ctor' && !!guard.prototype.canDeactivate);
}

export function isCanLoadGuard(guard: any, type: InternalGuardCan): guard is (CanLoadFn | CanLoad) {
  return (type === 'CanLoad')
    || (type === 'ctor' && !!guard.prototype.canLoad);
}

export function isCanMatchGuard(guard: any, type: InternalGuardCan): guard is (CanMatchFn | CanMatch) {
  return (type === 'CanMatch')
    || (type === 'ctor' && !!guard.prototype.canMatch);
}
