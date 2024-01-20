import { Pipe, Type } from '@angular/core';
import { Nullable } from '../../shared.model';
import { getAnnotation } from './annotation';

export function getPipeAnnotation<T>(PipeCtor: Type<T>): Nullable<Pipe> {
  return getAnnotation(PipeCtor, 'Pipe');
}

export function isPipeAnnotation(annotation: any): annotation is Pipe {
  return (annotation?.name !== undefined);
}
