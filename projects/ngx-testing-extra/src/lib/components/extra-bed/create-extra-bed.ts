import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { buildActionTools } from './action-tools';
import { ExtraBedFactory } from './extra-bed-factory';
import { ExtraOptions } from './models';
import { ActionTools } from './models/action-tools.model';
import { ExtraBed, ExtraCb } from './models/extra-bed.models';
import { QueryTools } from './models/query-tools.model';
import { buildQueryTools } from './query-tools';

export function createExtraBed<T>(rootComponent: Type<T>): ExtraBed<T> {
  const bed = new ExtraBedFactory(rootComponent);

  const bedFn: ExtraBed<T> = ((cb: ExtraCb<T>, opts: ExtraOptions = {}) => {

    const {
      startDetectChanges = true,
    } = opts;

    const expectationFn = (done: DoneFn = null!) => {
      const fixture: ComponentFixture<T> = bed['fixture'];
      const {
        componentInstance: component,
        debugElement: debug,
      } = fixture;

      const query: QueryTools = buildQueryTools(fixture);
      const action: ActionTools = buildActionTools(fixture);

      if (startDetectChanges) fixture.detectChanges();

      return cb({ fixture, component, debug, query, action }, done);
    };

    return (cb.length > 1)
      ? (done: DoneFn) => expectationFn(done)
      : () => expectationFn();
  }) as ExtraBed<T>;

  bedFn.import = bed.import.bind(bed) as any;
  bedFn.provide = bed.provide.bind(bed) as any;
  bedFn.declare = bed.declare.bind(bed) as any;
  bedFn.compile = bed.compile.bind(bed);
  bedFn.shouldCreate = bed.shouldCreate.bind(bed);

  return bedFn;
}
