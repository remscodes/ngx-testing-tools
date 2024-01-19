import { EnvironmentProviders, Provider, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { shouldCreate } from '../common/expectation/should-create';

export function expectModuleToCreate<T>(Module: Type<T>, providers: (Provider | EnvironmentProviders)[] = []): void {
  shouldCreate(() => TestBed
    .configureTestingModule({ imports: [Module], providers })
    .inject(Module),
  );
}
