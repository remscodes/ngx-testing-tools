import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { emitEvent } from './event';

/** @deprecated Use `ActionTools` instead to access this utility. Will be removed in v3. */
export function emitOutput(fixture: ComponentFixture<any>, selector: string, name: string, $event?: any): void
/** @deprecated Use `ActionTools` instead to access this utility. Will be removed in v3. */
export function emitOutput(fixture: ComponentFixture<any>, directive: Type<any>, name: string, $event?: any): void
/** @deprecated Use `ActionTools` instead to access this utility. Will be removed in v3. */
export function emitOutput(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>, name: string, $event?: any): void
export function emitOutput(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>, name: string, $event?: any): void {
  emitEvent(fixture, selectorOrDirective, name, $event);
}
