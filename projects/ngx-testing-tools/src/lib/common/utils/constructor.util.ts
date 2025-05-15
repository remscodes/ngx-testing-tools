import { Type, ɵisInjectable as isInjectable } from '@angular/core';

export function isConstructor<T>(target: any): target is Type<T> {
  return isInjectable(target);
}
