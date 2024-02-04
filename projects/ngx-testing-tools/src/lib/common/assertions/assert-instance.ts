import { Type } from '@angular/core';
import { throwInstanceError } from '../errors/throw-instance-error';

export function assertInstance(instance: unknown, Ctor: Type<unknown>): void {
  if (!(instance instanceof Ctor)) throwInstanceError({ name: Ctor.name });
}
