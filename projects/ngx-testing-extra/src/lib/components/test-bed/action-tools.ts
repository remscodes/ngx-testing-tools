import { ComponentFixture } from '@angular/core/testing';
import { click, emitOutput } from '../event';
import { ActionTools } from './models/action-tools.model';

export function buildActionTools(fixture: ComponentFixture<unknown>): ActionTools {
  return {
    click: (input) => click(fixture, input),
    emitOutput: (directive, name, val) => emitOutput(fixture, directive, name, val),
  };
}
