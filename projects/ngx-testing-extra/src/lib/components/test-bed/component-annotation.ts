import { Component, Directive, NgModule, Pipe, Type } from '@angular/core';
import { Nullable } from '../../models/shared.model';

export function isComponentAnnotation(annotation: Nullable<Component>): boolean {
  return (annotation?.templateUrl !== undefined)
    || (annotation?.template !== undefined);
}

// Inspired by https://github.com/angular/angular/blob/1f8c53cd0c6c54b9d017f888567b85683ab0d348/packages/core/testing/src/resolvers.ts#L48
export function getComponentAnnotation(ComponentCtor: Type<any>): Nullable<Component> {
  const annotations = (ComponentCtor as any)['__annotations__'];
  for (let i = annotations.length - 1; i >= 0; i --) {
    const annotation = annotations[i];
    const isKnownType = (annotation instanceof Directive) || (annotation instanceof Component) || (annotation instanceof Pipe) || (annotation instanceof NgModule);
    if (isKnownType) return (annotation instanceof Component) ? annotation : null;
  }
  return null;
}
