import { DebugElement, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { throwCannotFind } from './cannot-find';

/** @deprecated Use `ComponentTestBed` instead to access this utility. Will be removed in v3. */
export function findAllDebugElements(fixture: ComponentFixture<any>, selector: string): DebugElement[]
/** @deprecated Use `ComponentTestBed` instead to access this utility. Will be removed in v3. */
export function findAllDebugElements(fixture: ComponentFixture<any>, directive: Type<any>): DebugElement[]
/** @deprecated Use `ComponentTestBed` instead to access this utility. Will be removed in v3. */
export function findAllDebugElements(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): DebugElement[]
export function findAllDebugElements(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): DebugElement[] {
  const debugs: DebugElement[] = (typeof selectorOrDirective === 'string')
    ? fixture.debugElement.queryAll(By.css(selectorOrDirective))
    : fixture.debugElement.queryAll(By.directive(selectorOrDirective));

  if (debugs.length === 0) throwCannotFind(selectorOrDirective, 'many');

  return debugs;
}
