import { ComponentFixture } from '@angular/core/testing';
import { RendererTestBedFactory } from '../../test-beds/renderer/renderer-test-bed-factory';
import { buildActionTools } from './action/action-tools';
import { ActionTools } from './action/models/action-tools.model';
import { RendererTools } from './models/renderer-tools.model';
import { QueryTools } from './query/models/query-tools.model';
import { buildQueryTools } from './query/query-tools';

export function buildRendererTools<T>(factory: RendererTestBedFactory<unknown, any, any, T>): RendererTools<T> {
  const fixture: ComponentFixture<T> = factory['fixture'];

  const host: T = fixture.componentInstance;
  const element: HTMLElement | undefined = fixture.debugElement.children.at(0)?.nativeElement;

  const query: QueryTools = buildQueryTools(fixture);
  const action: ActionTools = buildActionTools(fixture);

  return { action, element, fixture, host, query };
}
