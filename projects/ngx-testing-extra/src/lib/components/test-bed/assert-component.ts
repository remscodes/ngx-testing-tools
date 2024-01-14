import { Component, Type } from '@angular/core';
import { Nullable } from '../../models/shared.model';
import { isComponentAnnotation } from './component-annotation';

export function assertComponent(TypeCtor: Type<any>, annotation: Nullable<Component>): void {
  if (!isComponentAnnotation(annotation))
    throw new Error(`The provided "${TypeCtor.name ?? TypeCtor}" is not a Component. The ComponentTestBed cannot be created.`);
}
