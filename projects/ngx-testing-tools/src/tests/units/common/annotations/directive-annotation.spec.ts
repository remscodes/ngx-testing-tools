import { Component, Directive } from '@angular/core';
import { getDirectiveAnnotation } from '../../../../lib/common/annotations/directive-annotation';

describe('Directive Annotation', () => {

  describe('getDirectiveAnnotation', () => {

    it('should get annotation', () => {
      @Directive()
      class FooDirective {}

      expect(getDirectiveAnnotation(FooDirective)).toBeTruthy();
    });

    it('should not get annotation', () => {
      @Component({ template: '' })
      class FooComponent {}

      expect(getDirectiveAnnotation(FooComponent)).toBeNull();
    });

    it('should not get annotation', () => {
      class Foo {}

      expect(getDirectiveAnnotation(Foo)).toBeNull();
    });
  });
});
