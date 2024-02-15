import { Type } from '@angular/core';

export interface ComponentActionTools {
  // setInput(name: string, $value: any, options?: InputOptions): void;
  //
  // setInput(selector: string, name: string, $value: any): void;
  //
  // setInput(directive: Type<any>, name: string, $value: any): void;

  // emitOutput(name: string, $event?: any): void;

  emitOutput(selector: string, name: string, $event?: any): void;

  emitOutput(directive: Type<any>, name: string, $event?: any): void;

  click(selector: string): void;

  click(directive: Type<any>): void;
}
