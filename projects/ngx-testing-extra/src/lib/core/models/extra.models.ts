import { ComponentRef, DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

export type ExtraFn<T> = (cb: ExtraCb<T>, opts?: ExtraOptions) => jasmine.ImplementationCallback

export type ExtraCb<T> = (tools: ExtraTools<T>) => jasmine.ImplementationCallback

export interface ExtraTools<T> {
  fixture: ComponentFixture<T>;
  ref: ComponentRef<T>;
  instance: T;
  debug: DebugElement;
}

export interface ExtraOptions {
  autoDetectChanges?: boolean;
}

export type MaybePromise<T> = T | Promise<T>;
