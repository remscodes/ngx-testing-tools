import { ComponentFixture } from '@angular/core/testing';
import { buildBaseTools } from '../../common/tools/base/base-tools';
import { DirectiveTestBedFactory } from '../directive-test-bed-factory';
import { DirectiveTools } from './models';

export function buildDirectiveTools<T, H>(factory: DirectiveTestBedFactory<T, H>): DirectiveTools<T, H> {
  const directive: T = factory['instance'];
  const fixture: ComponentFixture<H> = factory['fixture'];
  const { componentInstance: host } = fixture;

  const { injected, injector, rx } = buildBaseTools(factory);

  return { directive, fixture, host, injected, injector, rx };
}
