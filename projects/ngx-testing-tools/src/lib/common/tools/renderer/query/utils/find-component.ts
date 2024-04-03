import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { findDebugElement } from './find-debug-element';

/** @deprecated Use `QueryTools` instead to access this utility. Will be removed in v3. */
export function findComponent<T>(fixture: ComponentFixture<any>, selector: string): T
/** @deprecated Use `QueryTools` instead to access this utility. Will be removed in v3. */
export function findComponent<T>(fixture: ComponentFixture<any>, directive: Type<T>): T
/** @deprecated Use `QueryTools` instead to access this utility. Will be removed in v3. */
export function findComponent<T>(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<T>): T
export function findComponent<T>(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<T>): T {
  return findDebugElement(fixture, selectorOrDirective).componentInstance;
}
