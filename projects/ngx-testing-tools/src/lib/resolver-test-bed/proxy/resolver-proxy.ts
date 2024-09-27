import { inject, Injectable } from '@angular/core';
import { RESOLVER_INFO, ResolverInfo } from './resolver-info.token';

@Injectable()
export class ResolverProxy {

  private info: ResolverInfo = inject(RESOLVER_INFO);

  private isRootCtor: boolean = this.info.isRootCtor;

  public instance: any = (this.isRootCtor)
    ? inject(this.info.rootResolver)
    : this.info.rootResolver;
}
