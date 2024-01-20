import { Component, Directive } from '@angular/core';
import { getComponentAnnotation, isComponentAnnotation } from '../../../../lib/common/annotation/component-annotation';

describe('Component Annotation', () => {

  describe('isComponentAnnotation', () => {

    it('should be a component annotation', () => {
      expect(isComponentAnnotation({ templateUrl: '' })).toBeTrue();
    });

    it('should be a component annotation', () => {
      expect(isComponentAnnotation({ template: '' })).toBeTrue();
    });

    it('should not be a component annotation', () => {
      expect(isComponentAnnotation({ standalone: true })).toBeFalse();
    });
  });

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
