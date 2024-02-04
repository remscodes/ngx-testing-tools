import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { findDebugElement } from './find-debug-element';

/** @deprecated Use `ComponentTestBed` instead to access this utility. Will be removed in v3. */
export function findElement<T extends HTMLElement = HTMLElement>(fixture: ComponentFixture<any>, selector: string): T
/** @deprecated Use `ComponentTestBed` instead to access this utility. Will be removed in v3. */
export function findElement<T extends HTMLElement = HTMLElement>(fixture: ComponentFixture<any>, directive: Type<any>): T
/** @deprecated Use `ComponentTestBed` instead to access this utility. Will be removed in v3. */
export function findElement<T extends HTMLElement = HTMLElement>(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): T
export function findElement<T extends HTMLElement = HTMLElement>(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): T {
  return findDebugElement(fixture, selectorOrDirective).nativeElement;
}
