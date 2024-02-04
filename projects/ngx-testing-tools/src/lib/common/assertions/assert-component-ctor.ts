import { Component, Type } from '@angular/core';
import { getComponentAnnotation } from '../annotations/component-annotation';
import { throwCtorError } from '../errors/throw-ctor-error';
import { Nullable } from '../shared.models';

export function assertComponentCtor(ComponentCtor: Type<unknown>): void {
  const annotation: Nullable<Component> = getComponentAnnotation(ComponentCtor);
  if (!annotation)
    throwCtorError({ name: ComponentCtor.name ?? ComponentCtor, type: 'Component', testBedName: 'ComponentTestBed' });
}
