import { Pipe } from '@angular/core';
import { assertPipeCtor } from '../../../../lib/common/assertions/assert-pipe-ctor';

describe('assertPipeCtor', () => {
  @Pipe({ name: 'app' })
  class AppPipe {}

  class Foo {}

  it('should pass', () => {
    expect(() => assertPipeCtor(AppPipe))
      .not.toThrowError();
  });

  it('should throw', () => {
    expect(() => assertPipeCtor(Foo))
      .toThrowError('The provided "Foo" is not a Pipe. The PipeTestBed cannot be created.');
  });

  it('should throw error with [object Object] indication', () => {
    expect(() => assertPipeCtor({} as any))
      .toThrowError('The provided "[object Object]" is not a Pipe. The PipeTestBed cannot be created.');
  });
});
