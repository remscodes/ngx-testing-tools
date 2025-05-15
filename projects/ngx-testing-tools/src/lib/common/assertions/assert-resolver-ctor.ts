import { Type } from '@angular/core';
import { assertInjectableCtor } from './assert-injectable-ctor';

export function assertResolverCtor(ResolverCtor: Type<unknown>): void {
  assertInjectableCtor(ResolverCtor, 'ResolverTestBed');
}
