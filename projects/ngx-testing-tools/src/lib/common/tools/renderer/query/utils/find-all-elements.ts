import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { findAllDebugElements } from './find-all-debug-elements';

/** @deprecated Use `QueryTools` instead to access this utility. Will be removed in v3. */
export function findAllElements<T extends HTMLElement = HTMLElement>(fixture: ComponentFixture<any>, selector: string): T[]
/** @deprecated Use `QueryTools` instead to access this utility. Will be removed in v3. */
export function findAllElements<T extends HTMLElement = HTMLElement>(fixture: ComponentFixture<any>, directive: Type<any>): T[]
/** @deprecated Use `QueryTools` instead to access this utility. Will be removed in v3. */
export function findAllElements<T extends HTMLElement = HTMLElement>(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): T[]
export function findAllElements<T extends HTMLElement = HTMLElement>(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): T[] {
  return findAllDebugElements(fixture, selectorOrDirective).map(e => e.nativeElement);
}
