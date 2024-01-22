import { NgModule, Type } from '@angular/core';
import { getNgModuleAnnotation } from '../../../common/annotation/ng-module-annotation';
import { throwCtorError } from '../../../common/error/throw-ctor-error';
import { Nullable } from '../../../shared.model';

export function assertModuleCtor(ModuleCtor: Type<unknown>): void {
  const annotation: Nullable<NgModule> = getNgModuleAnnotation(ModuleCtor);
  if (!annotation)
    throwCtorError({ name: ModuleCtor.name ?? ModuleCtor, type: 'Module', testBedName: 'ModuleTestBed' });
}
