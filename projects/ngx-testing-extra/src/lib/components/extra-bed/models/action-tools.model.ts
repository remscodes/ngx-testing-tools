import { Type } from '@angular/core';

export interface ActionTools {
  click(selector: string): void;

  click(directive: Type<any>): void;

  emitChildOutput(directive: Type<any>, outputName: string, outputValue?: any): void;
}
