import { DebugElement, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { throwCannotFind } from './debug-error';

export function findAllDebugElements(fixture: ComponentFixture<any>, selector: string): DebugElement[]
export function findAllDebugElements(fixture: ComponentFixture<any>, directive: Type<any>): DebugElement[]
export function findAllDebugElements(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): DebugElement[]
export function findAllDebugElements(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): DebugElement[] {
  const debugs: DebugElement[] = (typeof selectorOrDirective === 'string')
    ? fixture.debugElement.queryAll(By.css(selectorOrDirective))
    : fixture.debugElement.queryAll(By.directive(selectorOrDirective));

  if (debugs.length === 0) throwCannotFind(selectorOrDirective, true);

  return debugs;
}
