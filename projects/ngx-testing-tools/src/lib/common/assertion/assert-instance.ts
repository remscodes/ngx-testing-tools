import { Type } from '@angular/core';
import { throwInstanceError } from '../error/throw-instance-error';

export function assertInstance(instance: unknown, Ctor: Type<unknown>): void {
  if (!(instance instanceof Ctor)) throwInstanceError({ name: `${Ctor.name} instance` });
}
