import { assertComponentFixture } from '../../../../lib/components/test-bed/assertions/assert-fixture';

describe('assertComponentFixture', () => {

  it('should throw error', () => {
    expect(() => assertComponentFixture(null))
      .toThrowError('ComponentFixture is falsy. You need to use `testBed.compile()` before running expectation.');
  });
});
