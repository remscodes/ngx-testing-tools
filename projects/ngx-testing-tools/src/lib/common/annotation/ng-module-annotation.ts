import { NgModule, Type } from '@angular/core';
import { Nullable } from '../../shared.model';
import { getAnnotation } from './annotation';

export function getNgModuleAnnotation<T>(NgModuleCtor: Type<T>): Nullable<NgModule> {
  return getAnnotation(NgModuleCtor, 'NgModule');
}
