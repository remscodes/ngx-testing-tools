import { Component, Type } from '@angular/core';
import { isComponentAnnotation } from '../../../common/annotation/component-annotation';
import { Nullable } from '../../../models/shared.model';

export function assertComponent(TypeCtor: Type<any>, annotation: Nullable<Component>): void {
  if (!annotation || !isComponentAnnotation(annotation))
    throw new Error(`The provided "${TypeCtor.name ?? TypeCtor}" is not a Component. The ComponentTestBed cannot be created.`);
}
