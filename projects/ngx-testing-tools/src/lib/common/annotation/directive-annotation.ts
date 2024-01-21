import { Directive, Type } from '@angular/core';
import { Nullable } from '../../shared.model';
import { getAnnotation } from './annotation';

export function getDirectiveAnnotation<T>(DirectiveCtor: Type<T>): Nullable<Directive> {
  return getAnnotation(DirectiveCtor, 'Directive');
}

export function isDirectiveAnnotation(annotation: any): annotation is Directive {
  return (annotation?.selector !== undefined);
}
