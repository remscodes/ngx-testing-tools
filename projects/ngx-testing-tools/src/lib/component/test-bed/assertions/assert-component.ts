import { Component, Type } from '@angular/core';
import { getComponentAnnotation, isComponentAnnotation } from '../../../common/annotation/component-annotation';
import { Nullable } from '../../../shared.model';

export function assertComponent(ComponentCtor: Type<any>): void {
  const annotation: Nullable<Component> = getComponentAnnotation(ComponentCtor);
  if (!annotation || !isComponentAnnotation(annotation))
    throw new Error(`The provided "${ComponentCtor.name ?? ComponentCtor}" is not a Component. The ComponentTestBed cannot be created.`);
}
