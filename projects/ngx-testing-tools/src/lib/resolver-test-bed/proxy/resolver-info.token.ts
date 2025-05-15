import { InjectionToken, Type } from '@angular/core';
import { Resolve, ResolveFn } from '@angular/router';

export interface ResolverInfo {
  rootResolver: Type<Resolve<unknown>> | ResolveFn<unknown>;
  isRootCtor: boolean;
}

export const RESOLVER_INFO = new InjectionToken<ResolverInfo>('ROOT_RESOLVER_INFO');
