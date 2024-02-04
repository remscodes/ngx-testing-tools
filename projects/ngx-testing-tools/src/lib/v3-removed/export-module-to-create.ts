import { EnvironmentProviders, Provider, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { shouldCreate } from '../common/expectations/should-create';

/** @deprecated Use `ModuleTestBed` instead. Will be removed in v3. */
export function expectModuleToCreate<T>(Module: Type<T>, providers: (Provider | EnvironmentProviders)[] = []): void {
  shouldCreate(() => TestBed
    .configureTestingModule({ imports: [Module], providers })
    .inject(Module),
  );
}
