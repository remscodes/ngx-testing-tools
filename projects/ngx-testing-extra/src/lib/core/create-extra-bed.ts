import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { ExtraBedFactory } from './extra-bed';
import { ExtraBed, ExtraCb, ExtraOptions } from './models/extra.models';

export function createExtraBed<T>(rootComponent: Type<T>): ExtraBed<T> {
  const bed = new ExtraBedFactory(rootComponent);

  const fn = ((cb: ExtraCb<T>, opts: ExtraOptions = {}) => {

    return () => {

      const fixture: ComponentFixture<T> = bed['fixture'];
      const {
        componentInstance: instance,
        debugElement: debug,
        componentRef: ref,
      } = fixture;
      const {
        startDetectChanges = true,
      } = opts;

      if (startDetectChanges) fixture.detectChanges();

      return cb({ fixture, instance, ref, debug });
    };
  }) as ExtraBed<T>;

  // @ts-ignore
  fn.import = bed.import.bind(bed);
  // @ts-ignore
  fn.provide = bed.provide.bind(bed);
  // @ts-ignore
  fn.declare = bed.declare.bind(bed);

  fn.compile = bed.compile.bind(bed);

  fn.shouldCreate = bed.shouldCreate.bind(bed);

  return fn;
}
