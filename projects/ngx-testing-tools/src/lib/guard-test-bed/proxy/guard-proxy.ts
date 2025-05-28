import { inject, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanActivateChildFn, CanActivateFn, CanDeactivate, CanDeactivateFn, CanLoad, CanLoadFn, CanMatch, CanMatchFn, Route, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { MaybeAsync } from '../../common/models/maybe-async.model';
import { GUARD_INFO, GuardInfo } from './guard-info.token';

@Injectable()
export class GuardProxy implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad, CanMatch {

  private info: GuardInfo = inject(GUARD_INFO);

  private isRootCtor: boolean = this.info.isRootCtor;

  public instance: any = (this.isRootCtor)
    ? inject(this.info.rootGuard)
    : this.info.rootGuard;

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<any> {
    return (this.isRootCtor)
      ? (this.instance as CanActivate).canActivate(route, state)
      : TestBed.runInInjectionContext(() => (this.instance as CanActivateFn)(route, state));
  }

  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<any> {
    return (this.isRootCtor)
      ? (this.instance as CanActivateChild).canActivateChild(childRoute, state)
      : TestBed.runInInjectionContext(() => (this.instance as CanActivateChildFn)(childRoute, state));
  }

  public canDeactivate(component: unknown, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): MaybeAsync<any> {
    return (this.isRootCtor)
      ? (this.instance as CanDeactivate<unknown>).canDeactivate(component, currentRoute, currentState, nextState)
      : TestBed.runInInjectionContext(() => (this.instance as CanDeactivateFn<unknown>)(component, currentRoute, currentState, nextState));
  }

  public canLoad(route: Route, segments: UrlSegment[]): MaybeAsync<any> {
    return (this.isRootCtor)
      ? (this.instance as CanLoad).canLoad(route, segments)
      : TestBed.runInInjectionContext(() => (this.instance as CanLoadFn)(route, segments));
  }

  public canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<any> {
    return (this.isRootCtor)
      ? (this.instance as CanMatch).canMatch(route, segments)
      : TestBed.runInInjectionContext(() => (this.instance as CanMatchFn)(route, segments));
  }
}
