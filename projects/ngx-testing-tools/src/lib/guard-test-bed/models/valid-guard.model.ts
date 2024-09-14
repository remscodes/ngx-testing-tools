import { Type } from '@angular/core';
import { GuardClass, GuardFn } from './guard-can.model';

export type ValidGuard<T> =
  T extends GuardClass ? Type<T>
    : T extends GuardFn ? T
      : never
