import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { ExtraBedFactory } from './extra-bed';
import { ExtraBed, ExtraCb, ExtraFn, ExtraOptions } from './models/extra.models';

export function createExtraBed<T>(rootComponent: Type<T>): ExtraBed<T> {
  const bed = new ExtraBedFactory(rootComponent);

  const fn: ExtraFn<T> = function (this: ExtraBedFactory<T>, cb: ExtraCb<T>, opts: ExtraOptions = {}) {
    const fixture: ComponentFixture<T> = this['fixture'];
    const {
      componentInstance: instance,
      debugElement: debug,
      componentRef: ref,
    } = fixture;
    const {
      startDetectChanges = true,
    } = opts;

    if (startDetectChanges) fixture.detectChanges();

    return (done: DoneFn) => cb({ fixture, instance, ref, debug, done });
  };

  return Object.assign(bed, fn);
}
