import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { findDebugElement } from './find-debug-element';

export function findElement<T extends HTMLElement = HTMLElement>(fixture: ComponentFixture<any>, selector: string): T
export function findElement<T extends HTMLElement = HTMLElement>(fixture: ComponentFixture<any>, directive: Type<any>): T
export function findElement<T extends HTMLElement = HTMLElement>(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): T
export function findElement<T extends HTMLElement = HTMLElement>(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): T {
  return findDebugElement(fixture, selectorOrDirective).nativeElement;
}
