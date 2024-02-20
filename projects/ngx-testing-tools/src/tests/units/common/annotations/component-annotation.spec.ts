import { Component, Directive } from '@angular/core';
import { getComponentAnnotation } from '../../../../lib/common/annotations/component-annotation';

describe('Component Annotation', () => {

  describe('getComponentAnnotation', () => {

    it('should get annotation', () => {
      @Component({ template: '' })
      class FooComponent {}

      expect(getComponentAnnotation(FooComponent)).toBeTruthy();
    });

    it('should not get annotation', () => {
      @Directive()
      class FooDirective {}

      expect(getComponentAnnotation(FooDirective)).toBeNull();
    });

    it('should not get annotation', () => {
      class Foo {}

      expect(getComponentAnnotation(Foo)).toBeNull();
    });
  });
});
