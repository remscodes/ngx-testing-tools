import { ClassProvider, ConstructorProvider, EnvironmentProviders, ExistingProvider, FactoryProvider, ModuleWithProviders, Type, TypeProvider, ValueProvider } from '@angular/core';

export type Importation =
  | Type<any>
  | ModuleWithProviders<any>

export type AnyProvider =
  | TypeProvider
  | ValueProvider
  | ClassProvider
  | ConstructorProvider
  | ExistingProvider
  | FactoryProvider
  | EnvironmentProviders

export type Declaration =
  | Type<any>
