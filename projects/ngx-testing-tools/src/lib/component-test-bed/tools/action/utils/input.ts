import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { findDebugElement } from '../../query/utils/find-debug-element';

export function setInput(fixture: ComponentFixture<any>, selector: string, name: string, $value: any): void
export function setInput(fixture: ComponentFixture<any>, directive: Type<any>, name: string, $value: any): void
export function setInput(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>, name: string, $value: any): void {
  const component = findDebugElement(fixture, selectorOrDirective).componentInstance;
  component[name] = $value;
  fixture.detectChanges();
}
