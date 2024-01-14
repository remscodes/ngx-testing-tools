import { ProviderToken } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

export function fromInjector<T>(fixture: ComponentFixture<any>, token: ProviderToken<T>): T {
  return fixture.debugElement.injector.get(token);
}
