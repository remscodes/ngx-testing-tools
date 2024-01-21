import { EnvironmentProviders, ModuleWithProviders, Provider, Type } from '@angular/core';

export type Importation =
  | Type<any>
  | ModuleWithProviders<any>

export type AnyProvider =
  | Provider
  | EnvironmentProviders

export type Declaration =
  | Type<any>
