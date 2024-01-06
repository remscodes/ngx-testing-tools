import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { ExtraBedFactory } from './extra-bed-factory';
import { ExtraBed, ExtraCb, ExtraOptions } from './models/extra.models';

export function createExtraBed<T>(rootComponent: Type<T>): ExtraBed<T> {
  const bed = new ExtraBedFactory(rootComponent);

  const bedFn: ExtraBed<T> = ((cb: ExtraCb<T>, opts: ExtraOptions = {}) => {
    const {
      startDetectChanges = true,
      withDoneFn = false,
    } = opts;

    const expectationFn = (done: DoneFn = createBrokenDoneFn()) => {
      const fixture: ComponentFixture<T> = bed['fixture'];
      const {
        componentInstance: instance,
        debugElement: debug,
        componentRef: ref,
      } = fixture;

      if (startDetectChanges) fixture.detectChanges();

      return cb({ fixture, instance, ref, debug, done });
    };

    return (withDoneFn)
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

function createBrokenDoneFn(): DoneFn {
  const error: string = 'An asynchronous it function took a done callback but also returned a promise. Either remove the done callback (recommended) or change the function to not return a promise and add withDoneFn option.';

  const doneFn: DoneFn = (() => {
    throw error;
  }) as unknown as DoneFn;

  doneFn.fail = () => {
    throw error;
  };

  return doneFn;
}
