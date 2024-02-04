import { Injectable, Type } from '@angular/core';
import { Nullable } from '../shared.models';
import { getAnnotation } from './annotation';

export function getInjectableAnnotation<T>(InjectableCtor: Type<T>): Nullable<Injectable> {
  return getAnnotation(InjectableCtor, 'Injectable');
}
