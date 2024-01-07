import { DebugElement, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { ExtraBedFactory } from '../extra-bed-factory';

export type ExtraFn<T> = (cb: ExtraCb<T>, opts?: ExtraOptions) => jasmine.ImplementationCallback

export type ExtraCb<T> = (tools: ExtraTools<T>, done: DoneFn) => ReturnType<jasmine.ImplementationCallback>

export interface ExtraTools<T> {
  fixture: ComponentFixture<T>;
  instance: T;
  debug: DebugElement;
  query: QueryTools;
  action: ActionTools;
}

export interface QueryTools {
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

export interface ActionTools {
  click(selector: string): void;

  click(directive: Type<any>): void;

  emitChildOutput(directive: Type<any>, outputName: string, outputValue?: any): void;
}

export interface ExtraOptions {
  /**
   * @default true
   */
  startDetectChanges?: boolean;
}

export interface ExtraBed<T> extends ExtraFn<T>, ExtraBedFactory<T> {}
