import { ComponentFixture } from '@angular/core/testing';
import { ComponentActionTools } from './models/component-action-tools.model';
import { click } from './utils/click';
import { emitOutput } from './utils/output';

export function buildComponentActionTools(fixture: ComponentFixture<unknown>): ComponentActionTools {
  return {
    click: (input) => click(fixture, input),
    emitOutput: (directive, name, val) => emitOutput(fixture, directive, name, val),
  };
}
