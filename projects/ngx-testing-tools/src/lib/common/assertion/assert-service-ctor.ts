import { Injectable, Type } from '@angular/core';
import { Nullable } from '../../shared.model';
import { getInjectableAnnotation } from '../annotation/injectable-annotation';
import { throwCtorError } from '../error/throw-ctor-error';

export function assertServiceCtor(ServiceCtor: Type<unknown>): void {
  const annotation: Nullable<Injectable> = getInjectableAnnotation(ServiceCtor);
  if (!annotation)
    throwCtorError({ name: ServiceCtor.name ?? ServiceCtor, type: 'Injectable Service', testBedName: 'ServiceTestBed' });
}
