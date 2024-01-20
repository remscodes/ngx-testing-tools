import { ComponentFixture } from '@angular/core/testing';
import { click, emitOutput } from '../action';
import { ComponentActionTools } from './models/component-action-tools.model';

export function buildComponentActionTools(fixture: ComponentFixture<unknown>): ComponentActionTools {
  return {
    click: (input) => click(fixture, input),
    emitOutput: (directive, name, val) => emitOutput(fixture, directive, name, val),
  };
}
