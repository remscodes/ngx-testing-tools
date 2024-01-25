import { Component, Directive } from '@angular/core';
import { getComponentAnnotation } from '../../../../lib/common/annotation/component-annotation';

describe('Component Annotation', () => {

  describe('getComponentAnnotation', () => {

    it('should get component annotation', () => {
      @Component({ template: '', standalone: true })
      class AComponent {}

      expect(getComponentAnnotation(AComponent)).toBeTruthy();
    });

    it('should not get component annotation', () => {
      class NotAComponent {}

      expect(getComponentAnnotation(NotAComponent)).toBeNull();
    });

    it('should not get component annotation', () => {
      @Directive({ selector: '[a]', standalone: true })
      class ADirective {}

      expect(getComponentAnnotation(ADirective)).toBeNull();
    });
  });
});
