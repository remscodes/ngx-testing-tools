import { Directive, Type } from '@angular/core';
import { Nullable } from '../shared.models';
import { getAnnotation } from './annotation';

export function getDirectiveAnnotation<T>(DirectiveCtor: Type<T>): Nullable<Directive> {
  return getAnnotation(DirectiveCtor, 'Directive');
}
