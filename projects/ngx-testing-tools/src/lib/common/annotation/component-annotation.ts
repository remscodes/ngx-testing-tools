import { Component, Type } from '@angular/core';
import { Nullable } from '../../shared.model';
import { getAnnotation } from './annotation';

export function getComponentAnnotation<T>(ComponentCtor: Type<T>): Nullable<Component> {
  return getAnnotation(ComponentCtor, 'Component');
}
