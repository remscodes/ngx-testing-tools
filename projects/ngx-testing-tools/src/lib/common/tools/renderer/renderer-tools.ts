import { ComponentFixture } from '@angular/core/testing';
import { RendererTestBedFactory } from '../../test-beds/renderer/renderer-test-bed-factory';
import { buildComponentActionTools } from './action/component-action-tools';
import { ComponentActionTools } from './action/models/component-action-tools.model';
import { RendererTools } from './models/renderer-tools.model';
import { buildComponentQueryTools } from './query/component-query-tools';
import { ComponentQueryTools } from './query/models/component-query-tools.model';

export function buildRendererTools<T>(factory: RendererTestBedFactory<unknown, any, any, T>): RendererTools<T> {
  const fixture: ComponentFixture<T> = factory['fixture'];

  const host: T = fixture.componentInstance;
  const element: HTMLElement | undefined = fixture.debugElement.children[0]?.nativeElement;

  const query: ComponentQueryTools = buildComponentQueryTools(fixture);
  const action: ComponentActionTools = buildComponentActionTools(fixture);

  return { action, element, fixture, host, query };
}
