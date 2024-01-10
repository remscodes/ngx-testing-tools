import { Type } from '@angular/core';

export interface ComponentActionTools {
  click(selector: string): void;

  click(directive: Type<any>): void;

  emitOutput(selector: string, name: string, $event?: any): void;

  emitOutput(directive: Type<any>, name: string, $event?: any): void;
}
