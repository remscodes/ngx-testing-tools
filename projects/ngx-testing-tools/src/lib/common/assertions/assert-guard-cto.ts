import { Type } from '@angular/core';
import { assertInjectableCtor } from './assert-injectable-ctor';

export function assertGuardCto(GuardCtor: Type<unknown>): void {
  assertInjectableCtor(GuardCtor, 'GuardTestBed');
}
