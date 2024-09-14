import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanActivateFn, CanDeactivate, CanLoad, CanMatch, GuardResult, MaybeAsync, Route, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { GUARD_INFO, GuardInfo } from './guard-info.token';

@Injectable()
export class GuardProxy implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad, CanMatch {

  private info: GuardInfo = inject(GUARD_INFO);

  private isRootCtor: boolean = this.info.isRootCtor;

  public instance: any = (this.isRootCtor)
    ? inject(this.info.rootGuard)
    : this.info.rootGuard;

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return (this.isRootCtor)
      ? (this.instance as CanActivate).canActivate(route, state)
      : TestBed.runInInjectionContext(() => (this.instance as CanActivateFn)(route, state));
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    throw new Error('Method not implemented.');
  }

  canDeactivate(component: unknown, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): MaybeAsync<GuardResult> {
    throw new Error('Method not implemented.');
  }

  canLoad(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    throw new Error('Method not implemented.');
  }

  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    throw new Error('Method not implemented.');
  }

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return (this.isRootCtor)
      ? (this.instance as HttpInterceptor).intercept(req, next)
      : TestBed.runInInjectionContext(() => (this.instance as HttpInterceptorFn)(req, next.handle));
  }
}
