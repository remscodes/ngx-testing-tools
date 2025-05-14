import { Type, ɵisInjectable as isInjectable } from '@angular/core';

export function isConstructor<T>(target: unknown): target is Type<T> {
  return !((typeof target === 'function') && !isInjectable(target))
}
