import { Pipe } from '@angular/core';
import { assertPipeCtor } from '../../../../lib/common/assertions/assert-pipe-ctor';

describe('assertPipeCtor', () => {

  it('should pass', () => {
    @Pipe({ name: 'foo' })
    class FooPipe {}

    expect(() => assertPipeCtor(FooPipe))
      .not.toThrowError();
  });

  it('should throw', () => {
    class Foo {}

    expect(() => assertPipeCtor(Foo))
      .toThrowError('The provided "Foo" is not a Pipe. The PipeTestBed cannot be created.');
  });

  it('should throw error with [object Object] indication', () => {
    expect(() => assertPipeCtor({} as any))
      .toThrowError('The provided "[object Object]" is not a Pipe. The PipeTestBed cannot be created.');
  });
});
