import { DebugElement, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Nullable } from '../models/shared.model';

export function findDebugElement(fixture: ComponentFixture<any>, selector: string): DebugElement
export function findDebugElement(fixture: ComponentFixture<any>, directive: Type<any>): DebugElement
export function findDebugElement(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): DebugElement
export function findDebugElement(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): DebugElement {
  const element: Nullable<DebugElement> = (typeof selectorOrDirective === 'string')
    ? fixture.debugElement.query(By.css(selectorOrDirective))
    : fixture.debugElement.query(By.directive(selectorOrDirective));

  if (!element) throwCannotFind(selectorOrDirective);

  return element;
}

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

export function throwCannotFind(selectorOrDirective: string | Type<any>, many: boolean = false): never {
  const input: string = (typeof selectorOrDirective === 'string')
    ? `selector "${selectorOrDirective}"`
    : `directive "${selectorOrDirective.name}"`;

  const quantifier: string = (many)
    ? 'many'
    : 'one';

  throw new Error(`Cannot find ${quantifier} DebugElement with : ${input}.`);
}
