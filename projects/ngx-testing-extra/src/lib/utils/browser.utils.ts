import { DebugElement, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Nullable } from '../models/shared.model';

export function findComponent<T>(fixture: ComponentFixture<any>, selector: string): T
export function findComponent<T>(fixture: ComponentFixture<any>, directive: Type<T>): T
export function findComponent<T>(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<T>): T {
  return findDebugElement(fixture, selectorOrDirective).componentInstance;
}

export function findAllComponents<T>(fixture: ComponentFixture<any>, selector: string): T[]
export function findAllComponents<T>(fixture: ComponentFixture<any>, directive: Type<T>): T[]
export function findAllComponents<T>(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<T>): T[] {
  return findAllDebugElements(fixture, selectorOrDirective).map(debug => debug.componentInstance);
}

function findElement<T = HTMLElement>(fixture: ComponentFixture<any>, selector: string): T
function findElement<T = HTMLElement>(fixture: ComponentFixture<any>, directive: Type<any>): T
function findElement<T = HTMLElement>(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): T
function findElement<T = HTMLElement>(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): T {
  return findDebugElement(fixture, selectorOrDirective).nativeElement;
}

export function findDebugElement(fixture: ComponentFixture<any>, selector: string): DebugElement
export function findDebugElement(fixture: ComponentFixture<any>, directive: Type<any>): DebugElement
export function findDebugElement(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): DebugElement
export function findDebugElement(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): DebugElement {
  const element: Nullable<DebugElement> = (typeof selectorOrDirective === 'string')
    ? fixture.debugElement.query(By.css(selectorOrDirective))
    : fixture.debugElement.query(By.directive(selectorOrDirective));

  if (!element) throw `Cannot find one DebugElement with ${(typeof selectorOrDirective === 'string') ? `selector "${selectorOrDirective}"` : `directive "${selectorOrDirective.name}"`}`;

  return element;
}

export function findAllDebugElements(fixture: ComponentFixture<any>, selector: string): DebugElement[]
export function findAllDebugElements(fixture: ComponentFixture<any>, directive: Type<any>): DebugElement[]
export function findAllDebugElements(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): DebugElement[]
export function findAllDebugElements(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): DebugElement[] {
  const debug: Nullable<DebugElement[]> = (typeof selectorOrDirective === 'string')
    ? fixture.debugElement.queryAll(By.css(selectorOrDirective))
    : fixture.debugElement.queryAll(By.directive(selectorOrDirective));

  if (!debug) throw `Cannot find many DebugElement with ${(typeof selectorOrDirective === 'string') ? `selector "${selectorOrDirective}"` : `directive "${selectorOrDirective.name}"`}`;

  return debug;
}

export function click(fixture: ComponentFixture<any>, selector: string): void
export function click(fixture: ComponentFixture<any>, directive: Type<any>): void
export function click(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): void {
  findDebugElement(fixture, selectorOrDirective).triggerEventHandler('click');
}

export function emitChildOutput(fixture: ComponentFixture<any>, directive: Type<any>, outputName: string, outputValue?: any): void {
  emitEvent(findDebugElement(fixture, directive), outputName, outputValue);
}

function emitEvent(debug: DebugElement, eventName: string, eventValue?: any): void {
  debug.triggerEventHandler(eventName, eventValue);
}

export function getTextContent(fixture: ComponentFixture<any>, selector: string): Nullable<string>
export function getTextContent(fixture: ComponentFixture<any>, directive: Type<any>): Nullable<string>
export function getTextContent(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): Nullable<string> {
  return findElement(fixture, selectorOrDirective).textContent;
}
