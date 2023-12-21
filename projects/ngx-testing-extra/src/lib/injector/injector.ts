import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

export function fromInjector<T>(fixture: ComponentFixture<any>, directive: Type<T>): T {
  return fixture.debugElement.injector.get(directive);
}
