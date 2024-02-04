import { Injectable, Type } from '@angular/core';
import { getInjectableAnnotation } from '../annotations/injectable-annotation';
import { throwCtorError } from '../errors/throw-ctor-error';
import { Nullable } from '../shared.models';

export function assertServiceCtor(ServiceCtor: Type<unknown>): void {
  const annotation: Nullable<Injectable> = getInjectableAnnotation(ServiceCtor);
  if (!annotation)
    throwCtorError({ name: ServiceCtor.name ?? ServiceCtor, type: 'Injectable Service', testBedName: 'ServiceTestBed' });
}
