import { assertInstance } from '../../../../lib/common/assertion/assert-instance';

describe('assertInstance', () => {
  class Foo {}

  const foo = new Foo();

  it('should pass', () => {
    expect(() => assertInstance(foo, Foo)).not.toThrowError();
  });

  it('should throw', () => {
    expect(() => assertInstance(null, Foo))
      .toThrowError('Foo instance is falsy. You need to set `autoCompile = true` or use `tb.compileEach();` or use `beforeEach(() => tb.compile());` before running expectations.');
  });
});
