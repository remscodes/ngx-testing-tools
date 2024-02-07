import { Type } from '@angular/core';

export function isConstructor<T>(target: unknown): target is Type<T> {
  return (typeof target === 'function')
    && !!target.prototype
    && !!target.name
    && (target.prototype.constructor === target);
}
