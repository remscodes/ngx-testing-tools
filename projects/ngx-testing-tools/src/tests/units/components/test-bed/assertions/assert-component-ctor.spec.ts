import { Component, Directive } from '@angular/core';
import { assertComponentCtor } from '../../../../../lib/common/assertion/assert-component-ctor';

describe('assertComponentCtor', () => {
  @Component({ selector: 'app-root2', template: ``, standalone: true })
  class AppComponent {}

  @Directive({ selector: '', standalone: true })
  class AppDirective {}

  it('should pass', () => {
    expect(() => assertComponentCtor(AppComponent))
      .not.toThrowError();
  });

  it('should throw error with AppDirective indication', () => {
    expect(() => assertComponentCtor(AppDirective))
      .toThrowError('The provided "AppDirective" is not a Component. The ComponentTestBed cannot be created.');
  });

  it('should throw error with [object Object] indication', () => {
    expect(() => assertComponentCtor({} as any))
      .toThrowError('The provided "[object Object]" is not a Component. The ComponentTestBed cannot be created.');
  });
});
