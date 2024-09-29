import { Injectable } from '@angular/core';
import { Resolve, ResolveFn } from '@angular/router';

export interface Post {
  title: string;
}

@Injectable()
export class PostResolver implements Resolve<Post> {

  public async resolve() {
    return { title: 'MyPost' };
  }
}

export const POST_RESOLVER = (async () => ({ title: 'MyPost' })) satisfies ResolveFn<Post>;
