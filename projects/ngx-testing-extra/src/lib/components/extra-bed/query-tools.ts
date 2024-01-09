import { ComponentFixture } from '@angular/core/testing';
import { findAllComponents, findComponent } from '../find-component';
import { findAllDebugElements, findDebugElement } from '../find-debug-element';
import { findAllElements, findElement } from '../find-element';
import { QueryTools } from './models/query-tools.model';

export function buildQueryTools(fixture: ComponentFixture<unknown>): QueryTools {
  return {
    findComponent: (input) => findComponent(fixture, input),
    findAllComponents: (input) => findAllComponents(fixture, input),
    findElement: (input) => findElement(fixture, input),
    findAllElements: (input) => findAllElements(fixture, input),
    findDebugElement: (input) => findDebugElement(fixture, input),
    findAllDebugElements: (input) => findAllDebugElements(fixture, input),
  };
}
