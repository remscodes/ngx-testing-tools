import { assertInstance } from '../../../../lib/common/assertions/assert-instance';

describe('assertInstance', () => {
  class Foo {}

  const foo = new Foo();

  it('should pass', () => {
    expect(() => assertInstance(foo, Foo)).not.toThrowError();
  });

  it('should throw', () => {
    expect(() => assertInstance(null, Foo))
      .toThrowError('Foo instance is falsy. You need to set `autoCompile = true` (default) or set `beforeEach(() => tb.compile());` and `autoCompile = false` before running expectations.');
  });
});
