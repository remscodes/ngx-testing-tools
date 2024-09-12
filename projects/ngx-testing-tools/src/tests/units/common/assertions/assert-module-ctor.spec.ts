import { Directive, NgModule } from '@angular/core';
import { assertModuleCtor } from '../../../../lib/common/assertions/assert-module-ctor';

describe('assertComponentCtor', () => {

  it('should pass', () => {
    @NgModule({})
    class FooModule {}

    expect(() => assertModuleCtor(FooModule))
      .not.toThrowError();
  });

  it('should throw error with AppDirective indication', () => {
    @Directive()
    class FooDirective {}

    expect(() => assertModuleCtor(FooDirective))
      .toThrowError('The provided "FooDirective" is not a Module. The ModuleTestBed cannot be created.');
  });

  it('should throw error with [object Object] indication', () => {
    expect(() => assertModuleCtor({} as any))
      .toThrowError('The provided "[object Object]" is not a Module. The ModuleTestBed cannot be created.');
  });
});
