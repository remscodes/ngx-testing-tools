import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { emitEvent } from './event';

export function emitOutput(fixture: ComponentFixture<any>, directive: Type<any>, name: string, value?: any): void
export function emitOutput(fixture: ComponentFixture<any>, directive: Type<any>, name: string, value?: any): void
export function emitOutput(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>, name: string, value?: any): void
export function emitOutput(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>, name: string, value?: any): void {
  emitEvent(fixture, selectorOrDirective, name, value);
}
