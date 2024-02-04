import { NgModule, Type } from '@angular/core';
import { Nullable } from '../shared.models';
import { getAnnotation } from './annotation';

export function getNgModuleAnnotation<T>(NgModuleCtor: Type<T>): Nullable<NgModule> {
  return getAnnotation(NgModuleCtor, 'NgModule');
}
