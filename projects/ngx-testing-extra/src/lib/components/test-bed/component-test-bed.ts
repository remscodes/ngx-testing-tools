import { DestroyRef, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { buildComponentActionTools } from './component-action-tools';
import { buildComponentQueryTools } from './component-query-tools';
import { ComponentTestBedFactory } from './component-test-bed-factory';
import { ComponentExtraOptions } from './models';
import { assertComponentFixture } from './models/assert-fixture';
import { ComponentActionTools } from './models/component-action-tools.model';
import { ComponentQueryTools } from './models/component-query-tools.model';
import { ComponentAssertion, ComponentTestBed } from './models/component-test-bed.models';

export function componentTestBed<T>(rootComponent: Type<T>): ComponentTestBed<T> {
  const bed = new ComponentTestBedFactory(rootComponent);

  const bedFn: ComponentTestBed<T> = ((assertionCb: ComponentAssertion<T>, options: ComponentExtraOptions = {}) => {

    const {
      startDetectChanges = true,
    } = options;

    const assertionFn = (done: DoneFn = null!) => {
      const fixture: ComponentFixture<T> = bed['fixture'];
      assertComponentFixture(fixture);

      const destroyRef: DestroyRef = bed['destroyRef'];
      const {
        componentInstance: component,
        debugElement: debug,
      } = fixture;
      const { injector } = debug;

      const query: ComponentQueryTools = buildComponentQueryTools(fixture);
      const action: ComponentActionTools = buildComponentActionTools(fixture);

      if (startDetectChanges) fixture.detectChanges();

      return assertionCb({ fixture, component, injector, destroyRef, debug, query, action }, done);
    };

    return (assertionCb.length > 1)
      ? (done: DoneFn) => assertionFn(done)
      : () => assertionFn();
  }) as ComponentTestBed<T>;

  bedFn.import = bed.import.bind(bed)! as any;
  bedFn.provide = bed.provide.bind(bed) as any;
  bedFn.declare = bed.declare.bind(bed) as any;
  bedFn.compile = bed.compile.bind(bed);
  bedFn.shouldCreate = bed.shouldCreate.bind(bed);

  return bedFn;
}
