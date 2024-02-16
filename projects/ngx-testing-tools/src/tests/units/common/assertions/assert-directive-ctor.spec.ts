import { Component, Directive } from '@angular/core';
import { assertDirectiveCtor } from '../../../../lib/common/assertions/assert-directive-ctor';

describe('assertDirectiveCtor', () => {
  @Directive({ selector: '', standalone: true })
  class AppDirective {}

  @Component({ selector: 'app-root3', template: ``, standalone: true })
  class AppComponent {}

  it('should pass', () => {
    expect(() => assertDirectiveCtor(AppDirective))
      .not.toThrowError();
  });

  it('should throw error with AppComponent indication', () => {
    expect(() => assertDirectiveCtor(AppComponent))
      .toThrowError('The provided "AppComponent" is not a Directive. The DirectiveTestBed cannot be created.');
  });

  it('should throw error with [object Object] indication', () => {
    expect(() => assertDirectiveCtor({} as any))
      .toThrowError('The provided "[object Object]" is not a Directive. The DirectiveTestBed cannot be created.');
  });
});
