import { ComponentFixture } from '@angular/core/testing';
import { click, emitChildOutput } from '../event';
import { ActionTools } from './models/extra.models';

export function buildActionTools(fixture: ComponentFixture<unknown>): ActionTools {
  return {
    click: (input) => click(fixture, input),
    emitChildOutput: (directive, name, val) => emitChildOutput(fixture, directive, name, val),
  };
}
