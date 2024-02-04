import { Pipe, Type } from '@angular/core';
import { Nullable } from '../shared.models';
import { getAnnotation } from './annotation';

export function getPipeAnnotation<T>(PipeCtor: Type<T>): Nullable<Pipe> {
  return getAnnotation(PipeCtor, 'Pipe');
}
