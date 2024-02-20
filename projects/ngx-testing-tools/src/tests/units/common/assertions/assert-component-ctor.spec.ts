import { Component, Directive } from '@angular/core';
import { assertComponentCtor } from '../../../../lib/common/assertions/assert-component-ctor';

describe('assertComponentCtor', () => {

  it('should pass', () => {
    @Component({ template: `` })
    class FooComponent {}

    expect(() => assertComponentCtor(FooComponent))
      .not.toThrowError();
  });

  it('should throw error with AppDirective indication', () => {
    @Directive()
    class FooDirective {}

    expect(() => assertComponentCtor(FooDirective))
      .toThrowError('The provided "FooDirective" is not a Component. The ComponentTestBed cannot be created.');
  });

  it('should throw error with [object Object] indication', () => {
    expect(() => assertComponentCtor({} as any))
      .toThrowError('The provided "[object Object]" is not a Component. The ComponentTestBed cannot be created.');
  });
});
