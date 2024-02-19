import { ComponentFixture } from '@angular/core/testing';
import { ActionTools } from './models/action-tools.model';
import { click } from './utils/click';
import { emitOutput } from './utils/output';

export function buildActionTools(fixture: ComponentFixture<unknown>): ActionTools {
  return {
    click: (input) => click(fixture, input),
    emitOutput: (directive, name, val) => emitOutput(fixture, directive, name, val),
    // setInput: (name: string, $value: any) => {}
  }
}
