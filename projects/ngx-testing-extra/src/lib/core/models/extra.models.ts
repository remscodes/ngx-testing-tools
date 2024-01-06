import { ComponentRef, DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { ExtraBedFactory } from '../extra-bed';

export type ExtraFn<T> = (cb: ExtraCb<T>, opts?: ExtraOptions) => jasmine.ImplementationCallback

export type ExtraCb<T> = (tools: ExtraTools<T>) => ReturnType<jasmine.ImplementationCallback>

export interface ExtraTools<T> {
  fixture: ComponentFixture<T>;
  instance: T;
  ref: ComponentRef<T>;
  debug: DebugElement;
  done: DoneFn;
}

export interface ExtraOptions {
  /**
   * @default true
   */
  startDetectChanges?: boolean;
}

export interface ExtraBed<T> extends ExtraFn<T>, ExtraBedFactory<T> {}
