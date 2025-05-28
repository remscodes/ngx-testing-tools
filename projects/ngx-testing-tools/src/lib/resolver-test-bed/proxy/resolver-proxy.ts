import { inject, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { MaybeAsync } from '../../common/models/maybe-async.model';
import { RESOLVER_INFO, ResolverInfo } from './resolver-info.token';

@Injectable()
export class ResolverProxy implements Resolve<unknown> {

  private info: ResolverInfo = inject(RESOLVER_INFO);

  private isRootCtor: boolean = this.info.isRootCtor;

  public instance: any = (this.isRootCtor)
    ? inject(this.info.rootResolver)
    : this.info.rootResolver;

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<unknown> {
    return (this.isRootCtor)
      ? (this.instance as Resolve<unknown>).resolve(route, state)
      : TestBed.runInInjectionContext(() => (this.instance as ResolveFn<unknown>)(route, state));
  }
}
