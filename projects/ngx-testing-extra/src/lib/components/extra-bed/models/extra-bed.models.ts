import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { ExtraBedFactory } from '../extra-bed-factory';
import { ActionTools } from './action-tools.model';
import { QueryTools } from './query-tools.model';

export interface ExtraBed<T> extends ExtraFn<T>, ExtraBedFactory<T> {}

export type ExtraFn<T> = (cb: ExtraCb<T>, opts?: ExtraOptions) => jasmine.ImplementationCallback

export type ExtraCb<T> = (tools: ExtraTools<T>, done: DoneFn) => ReturnType<jasmine.ImplementationCallback>

export interface ExtraTools<T> {
  fixture: ComponentFixture<T>;
  instance: T;
  debug: DebugElement;
  query: QueryTools;
  action: ActionTools;
}

export interface ExtraOptions {
  /**
   * @default true
   */
  startDetectChanges?: boolean;
}
