import { CanActivate, CanActivateChild, CanActivateChildFn, CanActivateFn, CanDeactivate, CanDeactivateFn, CanLoad, CanLoadFn, CanMatch, CanMatchFn } from '@angular/router';

export type GuardCan<T = unknown> =
  | CanActivate
  | CanActivateChild
  | CanDeactivate<T>
  | CanLoad
  | CanMatch

export type GuardCanFn<T = unknown> =
  | CanActivateFn
  | CanActivateChildFn
  | CanDeactivateFn<T>
  | CanLoadFn
  | CanMatchFn
