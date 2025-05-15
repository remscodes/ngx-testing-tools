import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';

export interface Post {
  title: string;
}

@Injectable()
export class PostResolver implements Resolve<Post> {

  public async resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    return { title: 'MyPost' };
  }
}

export const POST_RESOLVER = (async (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => ({ title: 'MyPost' })) satisfies ResolveFn<Post>;
