import { Type } from '@angular/core';
import { Resolve, ResolveFn } from '@angular/router';

export type ValidResolver<T> =
  T extends Resolve<unknown> ? Type<T>
    : T extends ResolveFn<unknown> ? T
      : never
