import { Component, Type } from '@angular/core';
import { Nullable } from '../../models/shared.model';
import { isComponentAnnotation } from './component-annotation';

export function assertComponent(TypeCtor: Type<any>, annotation: Nullable<Component>) {
  if (!isComponentAnnotation(annotation))
    throw new Error(`The provided "${TypeCtor.name}" is not a Component. Cannot create a ComponentTestBed.`);
}
