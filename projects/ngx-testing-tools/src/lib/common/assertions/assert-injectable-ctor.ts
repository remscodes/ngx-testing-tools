import { Injectable, Type } from '@angular/core';
import { getInjectableAnnotation } from '../annotations/injectable-annotation';
import { throwCtorError } from '../errors/throw-ctor-error';
import { Nullable } from '../shared.models';

export function assertInjectableCtor(InjectableCtor: Type<unknown>, testBedName: string): void {
  const annotation: Nullable<Injectable> = getInjectableAnnotation(InjectableCtor);
  if (!annotation) throwCtorError({ name: InjectableCtor.name ?? InjectableCtor, type: 'Injectable class', testBedName });
}
