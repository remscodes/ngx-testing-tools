import { Component, Type } from '@angular/core';
import { Nullable } from '../../models/shared.model';

export function isComponentAnnotation(annotation: Nullable<Component>): boolean {
  return (annotation?.templateUrl !== undefined)
    || (annotation?.template !== undefined);
}

export function getComponentAnnotation(ComponentCtor: Type<any>): Nullable<Component> {
  const annotations = (ComponentCtor as any)['__annotations__'];
  if (!annotations) return null;

  for (let i = annotations.length - 1; i >= 0; i --) {
    const annotation = annotations[i];
    if (annotation instanceof Component) return annotation;
  }
  return null;
}
