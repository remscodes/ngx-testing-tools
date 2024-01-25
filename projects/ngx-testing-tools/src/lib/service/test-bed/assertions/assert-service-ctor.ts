import { Injectable, Type } from '@angular/core';
import { getInjectableAnnotation } from '../../../common/annotation/injectable-annotation';
import { throwCtorError } from '../../../common/error/throw-ctor-error';
import { Nullable } from '../../../shared.model';

export function assertServiceCtor(ServiceCtor: Type<unknown>): void {
  const annotation: Nullable<Injectable> = getInjectableAnnotation(ServiceCtor);
  if (!annotation)
    throwCtorError({ name: ServiceCtor.name ?? ServiceCtor, type: 'Injectable Service', testBedName: 'ServiceTestBed' });
}
