import { ComponentFixture } from '@angular/core/testing';
import { findAllComponents, findAllDebugElements, findAllElements, findComponent, findDebugElement, findElement } from '../element';
import { QueryTools } from './models/extra.models';

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
