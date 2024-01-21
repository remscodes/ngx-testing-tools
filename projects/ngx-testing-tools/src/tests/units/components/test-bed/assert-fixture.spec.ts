import { assertComponentFixture } from '../../../../lib/component/test-bed/assertions/assert-fixture';

describe('assertComponentFixture', () => {

  it('should pass', () => {
    expect(() => assertComponentFixture({}))
      .not.toThrowError();
  });

  it('should throw error', () => {
    expect(() => assertComponentFixture(null))
      .toThrowError('ComponentFixture is falsy. You need to set componentTestBed options `autoCompile = true` or use `tb.compileEach();` or use `beforeEach(() => tb.compile());` before running expectations.');
  });
});
