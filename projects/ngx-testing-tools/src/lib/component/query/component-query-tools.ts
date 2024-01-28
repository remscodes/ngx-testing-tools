import { ComponentFixture } from '@angular/core/testing';
import { findAllComponents, findAllDebugElements, findAllElements, findComponent, findDebugElement, findElement } from './index';
import { ComponentQueryTools } from './models/component-query-tools.model';

export function buildComponentQueryTools(fixture: ComponentFixture<unknown>): ComponentQueryTools {
  return {
    findComponent: (input) => findComponent(fixture, input),
    findAllComponents: (input) => findAllComponents(fixture, input),
    findElement: (input) => findElement(fixture, input),
    findAllElements: (input) => findAllElements(fixture, input),
    findDebugElement: (input) => findDebugElement(fixture, input),
    findAllDebugElements: (input) => findAllDebugElements(fixture, input),
  };
}
