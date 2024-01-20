import { assertComponentFixture } from '../../../../lib/components/test-bed/assertions/assert-fixture';

describe('assertComponentFixture', () => {

  it('should pass', () => {
    expect(() => assertComponentFixture({}))
      .not.toThrowError();
  });

  it('should throw error', () => {
    expect(() => assertComponentFixture(null))
      .toThrowError('ComponentFixture is falsy. You need to use `beforeEach(() => tb.compile());` of `tb.compileEach();` before running expectations.');
  });
});
