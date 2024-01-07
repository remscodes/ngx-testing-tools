import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { ActionTools } from './action-tools.model';
import { QueryTools } from './query-tools.model';

export interface ExtraTools<T> {
  fixture: ComponentFixture<T>;
  instance: T;
  debug: DebugElement;
  query: QueryTools;
  action: ActionTools;
}
