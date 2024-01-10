import { DebugElement, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Nullable } from '../../models/shared.model';
import { throwCannotFind } from './cannot-find';

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
