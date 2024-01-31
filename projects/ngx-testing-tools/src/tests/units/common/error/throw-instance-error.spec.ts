import { throwInstanceError } from '../../../../lib/common/error/throw-instance-error';

describe('throwInstanceError', () => {

  it('should throw with specific message', () => {
    expect(() => throwInstanceError({ name: 'AppComponent' }))
      .toThrowError('AppComponent instance is falsy. You need to set `autoCompile = true` (default) or set `beforeEach(() => tb.compile());` and `autoCompile = false` before running expectations.');
  });
});
