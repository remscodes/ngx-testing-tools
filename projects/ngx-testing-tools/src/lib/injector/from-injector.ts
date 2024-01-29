import { ProviderToken } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

/** @deprecated Use `ComponentTestBed` instead to access this utility. Will be removed in v3. */
export function fromInjector<T>(fixture: ComponentFixture<any>, token: ProviderToken<T>): T {
  return fixture.debugElement.injector.get(token);
}
