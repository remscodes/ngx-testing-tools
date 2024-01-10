import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { emitOutput } from './output';

export function click(fixture: ComponentFixture<any>, selector: string): void
export function click(fixture: ComponentFixture<any>, directive: Type<any>): void
export function click(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): void
export function click(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): void {
  emitOutput(fixture, selectorOrDirective, 'click');
}
