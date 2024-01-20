import { Injectable, Type } from '@angular/core';
import { getInjectableAnnotation } from '../../common/annotation/injectable-annotation';
import { Nullable } from '../../shared.model';

export function assertService(ServiceCtor: Type<unknown>): void {
  const annotation: Nullable<Injectable> = getInjectableAnnotation(ServiceCtor);
  if (!annotation)
    throw new Error(`The provided "${ServiceCtor.name ?? ServiceCtor}" is not a Injectable Service. The ServiceTestBed cannot be created.`);
}
