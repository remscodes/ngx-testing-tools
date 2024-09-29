import { Type } from '@angular/core';
import { assertInjectableCtor } from './assert-injectable-ctor';

export function assertInterceptorCtor(InterceptorCtor: Type<unknown>): void {
  assertInjectableCtor(InterceptorCtor, 'InterceptorTestBed');
}
