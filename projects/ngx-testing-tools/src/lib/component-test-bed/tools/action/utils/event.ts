import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { findDebugElement } from '../../query/utils/find-debug-element';

export function emitEvent(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>, name: string, value?: any): void {
  findDebugElement(fixture, selectorOrDirective)
    .triggerEventHandler(name, value);
}
