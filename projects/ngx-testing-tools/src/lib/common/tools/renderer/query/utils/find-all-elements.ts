import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { findAllDebugElements } from './find-all-debug-elements';

export function findAllElements<T extends HTMLElement = HTMLElement>(fixture: ComponentFixture<any>, selector: string): T[]
export function findAllElements<T extends HTMLElement = HTMLElement>(fixture: ComponentFixture<any>, directive: Type<any>): T[]
export function findAllElements<T extends HTMLElement = HTMLElement>(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): T[]
export function findAllElements<T extends HTMLElement = HTMLElement>(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): T[] {
  return findAllDebugElements(fixture, selectorOrDirective).map(e => e.nativeElement);
}
