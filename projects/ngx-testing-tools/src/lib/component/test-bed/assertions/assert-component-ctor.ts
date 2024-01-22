import { Component, Type } from '@angular/core';
import { getComponentAnnotation, isComponentAnnotation } from '../../../common/annotation/component-annotation';
import { throwCtorError } from '../../../common/error/throw-ctor-error';
import { Nullable } from '../../../shared.model';

export function assertComponentCtor(ComponentCtor: Type<unknown>): void {
  const annotation: Nullable<Component> = getComponentAnnotation(ComponentCtor);
  if (!annotation || !isComponentAnnotation(annotation))
    throwCtorError({ name: ComponentCtor.name ?? ComponentCtor, type: 'Component', testBedName: 'ComponentTestBed' });
}
