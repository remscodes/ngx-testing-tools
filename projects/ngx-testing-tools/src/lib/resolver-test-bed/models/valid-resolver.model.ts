import { Type } from '@angular/core';
import { Resolve, ResolveFn } from '@angular/router';

export type ValidResolver<T> =
  T extends Resolve<any> ? Type<T>
    : T extends ResolveFn<any> ? T
      : never
