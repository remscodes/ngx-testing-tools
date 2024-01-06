import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { ExtraBedFactory } from './extra-bed-factory';
import { ExtraBed, ExtraCb, ExtraOptions } from './models/extra.models';

export function createExtraBed<T>(rootComponent: Type<T>): ExtraBed<T> {
  const bed = new ExtraBedFactory(rootComponent);

  const bedFn: ExtraBed<T> = ((cb: ExtraCb<T>, opts: ExtraOptions = {}) => {

    const {
      startDetectChanges = true,
    } = opts;

    const expectationFn = (done: DoneFn = null!) => {
      const fixture: ComponentFixture<T> = bed['fixture'];
      const {
        componentInstance: instance,
        debugElement: debug,
        componentRef: ref,
      } = fixture;

      if (startDetectChanges) fixture.detectChanges();

      return cb({ fixture, instance, ref, debug }, done);
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
