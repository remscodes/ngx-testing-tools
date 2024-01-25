import { ComponentFixture } from '@angular/core/testing';
import { findAllElements } from '../../../../lib';
import { InnerComponent } from '../../../fixtures/components/inner.component';
import { OuterComponent } from '../../../fixtures/components/outer.component';
import { MyButtonDirective } from '../../../fixtures/directives/my-button.directive';
import { NoWhereDirective } from '../../../fixtures/directives/no-where.directive';
import { createOuterComponentFixture } from '../../../fixtures/helpers/configuration/create-outer-component-fixture';
import { validateArray } from '../../../fixtures/helpers/validators/validate-array';
import { validateInstanceType } from '../../../fixtures/helpers/validators/validate-instance-type';

describe('findAllElements', () => {
  let fixture: ComponentFixture<OuterComponent>;
  let component: OuterComponent;

  beforeEach(async () => {
    fixture = await createOuterComponentFixture();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('HTMLButtonElement', () => {

    it('should find all buttons by selector', () => {
      const buttons = findAllElements<HTMLButtonElement>(fixture, 'button');
      validateArrayOfNativeElements(buttons);
    });

    it('should find all buttons by directive', () => {
      const buttons = findAllElements<HTMLButtonElement>(fixture, MyButtonDirective);
      validateArrayOfNativeElements(buttons);
    });
  });

  describe('Component native element', () => {

    beforeEach(() => {
      component.extraInner = true;
      fixture.detectChanges();
    });

    it('should find all InnerComponent elements by selector', () => {
      const inners = findAllElements(fixture, 'app-inner');
      validateArrayOfNativeElements(inners);
    });

    it('should find all InnerComponent elements by directive', () => {
      const inners = findAllElements(fixture, InnerComponent);
      validateArrayOfNativeElements(inners);
    });
  });

  it('should not find all by selector', () => {
    expect(() => findAllElements(fixture, 'app-no-where'))
      .toThrowError('Cannot find many DebugElement with : selector "app-no-where".');
  });

  it('should not find all by directive', () => {
    expect(() => findAllElements(fixture, NoWhereDirective))
      .toThrowError('Cannot find many DebugElement with : directive "NoWhereDirective".');
  });

  function validateArrayOfNativeElements(elements: unknown[]): void {
    validateArray(elements, { size: 2 });
    elements.forEach(element => validateInstanceType(element, HTMLElement));
  }
});
