import { NgModule, Type } from '@angular/core';
import { Nullable } from '../../shared.model';
import { getNgModuleAnnotation } from '../annotation/ng-module-annotation';
import { throwCtorError } from '../error/throw-ctor-error';

export function assertModuleCtor(ModuleCtor: Type<unknown>): void {
  const annotation: Nullable<NgModule> = getNgModuleAnnotation(ModuleCtor);
  if (!annotation)
    throwCtorError({ name: ModuleCtor.name ?? ModuleCtor, type: 'Module', testBedName: 'ModuleTestBed' });
}
