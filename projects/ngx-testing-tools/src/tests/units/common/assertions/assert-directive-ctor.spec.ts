import { Component, Directive } from '@angular/core';
import { assertDirectiveCtor } from '../../../../lib/common/assertions/assert-directive-ctor';

describe('assertDirectiveCtor', () => {

  it('should pass', () => {
    @Directive()
    class FooDirective {}

    expect(() => assertDirectiveCtor(FooDirective))
      .not.toThrowError();
  });

  it('should throw error with AppComponent indication', () => {
    @Component({ template: `` })
    class FooComponent {}

    expect(() => assertDirectiveCtor(FooComponent))
      .toThrowError('The provided "FooComponent" is not a Directive. The DirectiveTestBed cannot be created.');
  });

  it('should throw error with [object Object] indication', () => {
    expect(() => assertDirectiveCtor({} as any))
      .toThrowError('The provided "[object Object]" is not a Directive. The DirectiveTestBed cannot be created.');
  });
});
