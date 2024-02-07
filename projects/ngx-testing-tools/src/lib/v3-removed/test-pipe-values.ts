import { PipeTransform } from '@angular/core';

/** @deprecated Use the `PipeTestBed` with `VerifyTools` instead. Will be removed in v3. */
export function testPipeValues<T extends PipeTransform>(pipe: T, record: Record<any, string>): void {
  Object.entries(record).forEach(([current, expected]: [any, string]) => {
    it(`should transform "${current}" to "${expected}"`, () => {
      expect(pipe.transform(current)).toEqual(expected);
    });
  });
}
