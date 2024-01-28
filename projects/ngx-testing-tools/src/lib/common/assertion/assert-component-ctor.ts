import { Component, Type } from '@angular/core';
import { Nullable } from '../../shared.model';
import { getComponentAnnotation } from '../annotation/component-annotation';
import { throwCtorError } from '../error/throw-ctor-error';

export function assertComponentCtor(ComponentCtor: Type<unknown>): void {
  const annotation: Nullable<Component> = getComponentAnnotation(ComponentCtor);
  if (!annotation)
    throwCtorError({ name: ComponentCtor.name ?? ComponentCtor, type: 'Component', testBedName: 'ComponentTestBed' });
}
