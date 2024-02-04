import { NgModule, Type } from '@angular/core';
import { getNgModuleAnnotation } from '../annotations/ng-module-annotation';
import { throwCtorError } from '../errors/throw-ctor-error';
import { Nullable } from '../shared.models';

export function assertModuleCtor(ModuleCtor: Type<unknown>): void {
  const annotation: Nullable<NgModule> = getNgModuleAnnotation(ModuleCtor);
  if (!annotation)
    throwCtorError({ name: ModuleCtor.name ?? ModuleCtor, type: 'Module', testBedName: 'ModuleTestBed' });
}
