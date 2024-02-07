import { assertFn } from '../../../../lib/common/assertions/assert-fn';

describe('assertFn', () => {

  it('should pass', () => {
    expect(() => assertFn(() => {}))
      .not.toThrowError();
  });

  it('should throw', () => {
    expect(() => assertFn(1))
      .toThrowError('The provided "1" is not a valid function.');
  });
});
