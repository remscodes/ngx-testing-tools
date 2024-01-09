import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { findAllDebugElements, findDebugElement } from './find-debug-element';

export function findComponent<T>(fixture: ComponentFixture<any>, selector: string): T
export function findComponent<T>(fixture: ComponentFixture<any>, directive: Type<T>): T
export function findComponent<T>(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<T>): T
export function findComponent<T>(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<T>): T {
  return findDebugElement(fixture, selectorOrDirective).componentInstance;
}

export function findAllComponents<T>(fixture: ComponentFixture<any>, selector: string): T[]
export function findAllComponents<T>(fixture: ComponentFixture<any>, directive: Type<T>): T[]
export function findAllComponents<T>(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<T>): T[]
export function findAllComponents<T>(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<T>): T[] {
  return findAllDebugElements(fixture, selectorOrDirective).map(e => e.componentInstance);
}
