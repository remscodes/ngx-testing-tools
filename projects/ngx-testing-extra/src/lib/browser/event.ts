import { DebugElement, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { Nullable } from '../models/shared.model';
import { findDebugElement, findElement } from './element';

export function click(fixture: ComponentFixture<any>, selector: string): void
export function click(fixture: ComponentFixture<any>, directive: Type<any>): void
export function click(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): void {
  const debug: DebugElement = findDebugElement(fixture, selectorOrDirective);
  emitEvent(debug, 'click');
}

export function emitChildOutput(fixture: ComponentFixture<any>, directive: Type<any>, outputName: string, outputValue?: any): void {
  const debug: DebugElement = findDebugElement(fixture, directive);
  emitEvent(debug, outputName, outputValue);
}

function emitEvent(debug: DebugElement, eventName: string, eventValue?: any): void {
  debug.triggerEventHandler(eventName, eventValue);
}

export function getTextContent(fixture: ComponentFixture<any>, selector: string): Nullable<string>
export function getTextContent(fixture: ComponentFixture<any>, directive: Type<any>): Nullable<string>
export function getTextContent(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): Nullable<string> {
  return findElement(fixture, selectorOrDirective).textContent;
}
