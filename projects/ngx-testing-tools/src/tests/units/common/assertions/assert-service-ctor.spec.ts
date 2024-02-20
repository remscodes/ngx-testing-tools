import { Directive, Injectable } from '@angular/core';
import { assertServiceCtor } from '../../../../lib/common/assertions/assert-service-ctor';

describe('assertServiceCtor', () => {

  it('should pass', () => {
    @Injectable()
    class FooService {}

    expect(() => assertServiceCtor(FooService))
      .not.toThrowError();
  });

  it('should throw error with AppDirective indication', () => {
    @Directive({ selector: '' })
    class FooDirective {}

    expect(() => assertServiceCtor(FooDirective))
      .toThrowError('The provided "FooDirective" is not a Injectable Service. The ServiceTestBed cannot be created.');
  });

  it('should throw error with AppDirective indication', () => {
    expect(() => assertServiceCtor({} as any))
      .toThrowError('The provided "[object Object]" is not a Injectable Service. The ServiceTestBed cannot be created.');
  });
});
