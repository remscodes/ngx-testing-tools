import { EnvironmentProviders, Provider, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';

export function expectModuleToCreate<T>(Module: Type<T>, providers: (Provider | EnvironmentProviders)[] = []): void {
  it('should create', () => {
    const module: T = TestBed.configureTestingModule({ imports: [Module], providers }).inject(Module);
    expect(module).toBeTruthy();
  });
}
