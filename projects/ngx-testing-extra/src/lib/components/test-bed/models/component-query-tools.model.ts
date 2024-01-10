import { DebugElement, Type } from '@angular/core';

export interface ComponentQueryTools {
  findComponent<T>(selector: string): T;

  findComponent<T>(directive: Type<T>): T;

  findAllComponents<T>(selector: string): T[];

  findAllComponents<T>(directive: Type<T>): T[];

  findElement<T extends HTMLElement = HTMLElement>(selector: string): T;

  findElement<T extends HTMLElement = HTMLElement>(directive: Type<any>): T;

  findAllElements<T extends HTMLElement = HTMLElement>(selector: string): T[];

  findAllElements<T extends HTMLElement = HTMLElement>(directive: Type<any>): T[];

  findDebugElement(selector: string): DebugElement;

  findDebugElement(directive: Type<any>): DebugElement;

  findAllDebugElements(selector: string): DebugElement[];

  findAllDebugElements(directive: Type<any>): DebugElement[];
}
