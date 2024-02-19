import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { findAllDebugElements } from './find-all-debug-elements';

/** @deprecated Use `ComponentTestBed` instead to access this utility. Will be removed in v3. */
export function findAllComponents<T>(fixture: ComponentFixture<any>, selector: string): T[]
/** @deprecated Use `ComponentTestBed` instead to access this utility. Will be removed in v3. */
export function findAllComponents<T>(fixture: ComponentFixture<any>, directive: Type<T>): T[]
/** @deprecated Use `ComponentTestBed` instead to access this utility. Will be removed in v3. */
export function findAllComponents<T>(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<T>): T[]
export function findAllComponents<T>(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<T>): T[] {
  return findAllDebugElements(fixture, selectorOrDirective).map(e => e.componentInstance);
}
