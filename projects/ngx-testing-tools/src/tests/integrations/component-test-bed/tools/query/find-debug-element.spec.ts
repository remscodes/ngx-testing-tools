import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { findDebugElement } from '../../../../../lib';
import { InnerComponent } from '../../../../fixtures/components/inner.component';
import { OuterComponent } from '../../../../fixtures/components/outer.component';
import { MyButtonDirective } from '../../../../fixtures/directives/my-button.directive';
import { NoWhereDirective } from '../../../../fixtures/directives/no-where.directive';
import { createOuterComponentFixture } from '../../../../fixtures/helpers/configuration/create-outer-component-fixture';
import { validateInstanceType } from '../../../../fixtures/helpers/validators/validate-instance-type';

describe('DebugElement', () => {
  let fixture: ComponentFixture<OuterComponent>;

  beforeEach(async () => {
    fixture = await createOuterComponentFixture();
    fixture.detectChanges();
  });

  it('should find InnerComponent debug element by selector', () => {
    const debug = findDebugElement(fixture, 'app-inner');
    validateDebugElement(debug);
  });

  it('should find InnerComponent debug element by directive', () => {
    const debug = findDebugElement(fixture, InnerComponent);
    validateDebugElement(debug);
  });

  it('should find button debug element by selector', () => {
    const debug = findDebugElement(fixture, '#my-outer-button');
    validateDebugElement(debug);
  });

  it('should find button debug element by directive', () => {
    const debug = findDebugElement(fixture, MyButtonDirective);
    validateDebugElement(debug);
  });

  it('should not find one by selector', () => {
    expect(() => findDebugElement(fixture, '#no-where-button'))
      .toThrowError('Cannot find one DebugElement with : selector "#no-where-button".');
  });

  it('should not find one by directive', () => {
    expect(() => findDebugElement(fixture, NoWhereDirective))
      .toThrowError('Cannot find one DebugElement with : directive "NoWhereDirective".');
  });

  function validateDebugElement(debug: unknown): void {
    validateInstanceType(debug, DebugElement);
  }
});
