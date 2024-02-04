import { ComponentFixture } from '@angular/core/testing';
import { ComponentQueryTools } from './models/component-query-tools.model';
import { findAllComponents } from './utils/find-all-components';
import { findAllDebugElements } from './utils/find-all-debug-elements';
import { findAllElements } from './utils/find-all-elements';
import { findComponent } from './utils/find-component';
import { findDebugElement } from './utils/find-debug-element';
import { findElement } from './utils/find-element';

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
