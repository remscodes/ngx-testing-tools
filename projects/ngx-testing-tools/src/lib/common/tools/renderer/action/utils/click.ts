import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { emitOutput } from './output';

/** @deprecated Use `ActionTools` instead to access this utility. Will be removed in v3. */
export function click(fixture: ComponentFixture<any>, selector: string): void
/** @deprecated Use `ActionTools` instead to access this utility. Will be removed in v3. */
export function click(fixture: ComponentFixture<any>, directive: Type<any>): void
/** @deprecated Use `ActionTools` instead to access this utility. Will be removed in v3. */
export function click(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): void
export function click(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): void {
  emitOutput(fixture, selectorOrDirective, 'click');
}
