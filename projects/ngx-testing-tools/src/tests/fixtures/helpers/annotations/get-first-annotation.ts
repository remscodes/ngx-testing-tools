import { Type } from '@angular/core';

export function getFirstAnnotation<T>(TypeCtor: Type<any>): T {
  return (TypeCtor as any)['__annotations__'][0];
}
