import { assertInstance } from '../../../../lib/common/assertions/assert-instance';

describe('assertInstance', () => {

  it('should pass', () => {
    class Foo {}

    expect(() => assertInstance(new Foo(), Foo))
      .not.toThrowError();
  });

  it('should throw', () => {
    class Foo {}

    expect(() => assertInstance(null, Foo))
      .toThrowError('Foo instance is falsy. You need to set `autoCompile = true` (default) or set `beforeEach(() => tb.compile());` and `autoCompile = false` before running expectations.');
  });
});
