import { Directive, Injectable } from '@angular/core';
import { assertInjectableCtor } from '../../../../lib/common/assertions/assert-injectable-ctor';

describe('assertInjectableCtor', () => {

  it('should pass', () => {
    @Injectable()
    class FooService {}

    expect(() => assertInjectableCtor(FooService, 'ResolverTestBed'))
      .not.toThrowError();
  });

  it('should throw error with AppDirective indication', () => {
    @Directive()
    class FooDirective {}

    expect(() => assertInjectableCtor(FooDirective, 'ResolverTestBed'))
      .toThrowError('The provided "FooDirective" is not a Injectable class. The ResolverTestBed cannot be created.');
  });

  it('should throw error with [object Object] indication', () => {
    expect(() => assertInjectableCtor({} as any, 'ResolverTestBed'))
      .toThrowError('The provided "[object Object]" is not a Injectable class. The ResolverTestBed cannot be created.');
  });
});
