import { Component, Directive } from '@angular/core';
import { getComponentAnnotation, isComponentAnnotation } from '../../../../lib/components/test-bed/component-annotation';

describe('Component Annotation', () => {

  describe('isComponentAnnotation', () => {

    it('should be a component annotation', () => {
      expect(isComponentAnnotation({ templateUrl: '' })).toBeTrue();
    });

    it('should be a component annotation', () => {
      expect(isComponentAnnotation({ template: '' })).toBeTrue();
    });

    it('should not be a component annotation', () => {
      expect(isComponentAnnotation({})).toBeFalse();
    });
  });

  describe('getComponentAnnotation', () => {

    it('should get component annotation', () => {
      @Component({ template: '' })
      class AComponent {}

      expect(getComponentAnnotation(AComponent)).toBeTruthy();
    });

    it('should not get component annotation', () => {
      class NotAComponent {}

      expect(getComponentAnnotation(NotAComponent)).toBeNull();
    });

    it('should not get component annotation', () => {
      @Directive({ selector: '[a]' })
      class ADirective {}

      expect(getComponentAnnotation(ADirective)).toBeNull();
    });
  });
});
