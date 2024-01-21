import { NgModule, Type } from '@angular/core';
import { getNgModuleAnnotation } from '../../../common/annotation/ng-module-annotation';
import { Nullable } from '../../../shared.model';

export function assertModuleCtor(ModuleCtor: Type<unknown>): void {
  const annotation: Nullable<NgModule> = getNgModuleAnnotation(ModuleCtor);
  if (!annotation)
    throw new Error(`The provided "${ModuleCtor.name ?? ModuleCtor}" is not a Module. The ModuleTestBed cannot be created.`);
}
