import { Injectable, Type } from '@angular/core';
import { Nullable } from '../../models/shared.model';
import { getAnnotation } from './annotation';

export function getInjectableAnnotation<T>(InjectableCtor: Type<T>): Nullable<Injectable> {
  return getAnnotation(InjectableCtor, 'Injectable');
}
