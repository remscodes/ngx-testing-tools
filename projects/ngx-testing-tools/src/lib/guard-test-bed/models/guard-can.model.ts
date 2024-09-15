import { CanActivate, CanActivateChild, CanActivateChildFn, CanActivateFn, CanDeactivate, CanDeactivateFn, CanLoad, CanLoadFn, CanMatch, CanMatchFn } from '@angular/router';

export type GuardClass<ComponentType = unknown> =
  | CanActivate
  | CanActivateChild
  | CanDeactivate<ComponentType>
  | CanLoad
  | CanMatch

export type GuardFn<ComponentType = any> =
  | CanActivateFn
  | CanActivateChildFn
  | CanDeactivateFn<ComponentType>
  | CanLoadFn
  | CanMatchFn

export type GuardCan =
  | 'CanActivate'
  | 'CanActivateChild'
  | 'CanDeactivate'
  | 'CanLoad'
  | 'CanMatch'

export type InternalGuardCan =
  | GuardCan
  | 'ctor'
