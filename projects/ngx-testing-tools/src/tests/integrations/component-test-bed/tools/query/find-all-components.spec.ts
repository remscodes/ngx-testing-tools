import { ComponentFixture } from '@angular/core/testing';
import { findAllComponents } from '../../../../../lib/common/tools/renderer/query/utils/find-all-components';
import { InnerComponent } from '../../../../fixtures/components/inner.component';
import { NoWhereComponent } from '../../../../fixtures/components/no-where.component';
import { OuterComponent } from '../../../../fixtures/components/outer.component';
import { createOuterComponentFixture } from '../../../../fixtures/helpers/configuration/create-outer-component-fixture';
import { validateArray } from '../../../../fixtures/helpers/validators/validate-array';
import { validateInstanceType } from '../../../../fixtures/helpers/validators/validate-instance-type';

describe('findAllComponents', () => {
  let fixture: ComponentFixture<OuterComponent>;
  let component: OuterComponent;

  beforeEach(async () => {
    fixture = await createOuterComponentFixture();
    component = fixture.componentInstance;
    component.extraInner = true;
    fixture.detectChanges();
  });

  it('should find all InnerComponent instances by selector', () => {
    const inners = findAllComponents<InnerComponent>(fixture, 'app-inner');
    validateArrayOfComponentInstances(inners);
  });

  it('should find all InnerComponent instances by directive', () => {
    const inners = findAllComponents<InnerComponent>(fixture, InnerComponent);
    validateArrayOfComponentInstances(inners);
  });

  it('should not find all component instances by selector', () => {
    expect(() => findAllComponents(fixture, 'app-no-where'))
      .toThrowError('Cannot find many DebugElement with : selector "app-no-where".');
  });

  it('should not find all component instances by directive', () => {
    expect(() => findAllComponents(fixture, NoWhereComponent))
      .toThrowError('Cannot find many DebugElement with : directive "NoWhereComponent".');
  });

  function validateArrayOfComponentInstances(inners: unknown[]): void {
    validateArray(inners, { size: 2 });
    inners.forEach(inner => validateInstanceType(inner, InnerComponent));
  }
});
