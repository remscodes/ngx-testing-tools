import { ComponentFixture } from '@angular/core/testing';
import { buildBaseTools } from '../../common/tools/base/base-tools';
import { buildComponentActionTools } from '../../component-test-bed/tools/action/component-action-tools';
import { ComponentActionTools } from '../../component-test-bed/tools/action/models/component-action-tools.model';
import { buildComponentQueryTools } from '../../component-test-bed/tools/query/component-query-tools';
import { ComponentQueryTools } from '../../component-test-bed/tools/query/models/component-query-tools.model';
import { DirectiveTestBedFactory } from '../directive-test-bed-factory';
import { DirectiveTools } from './models';

export function buildDirectiveTools<T, H>(factory: DirectiveTestBedFactory<T, H>): DirectiveTools<T, H> {
  const directive: T = factory['instance'];
  const fixture: ComponentFixture<H> = factory['fixture'];
  const { componentInstance: host } = fixture;

  const query: ComponentQueryTools = buildComponentQueryTools(fixture);
  const action: ComponentActionTools = buildComponentActionTools(fixture);
  const { injected, injector, rx } = buildBaseTools(factory);

  return { action, directive, fixture, host, injected, injector, query, rx };
}
