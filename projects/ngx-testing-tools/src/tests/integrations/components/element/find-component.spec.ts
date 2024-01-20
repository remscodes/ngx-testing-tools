import { ComponentFixture } from '@angular/core/testing';
import { findComponent } from '../../../../lib/component';
import { InnerComponent } from '../../../fixtures/components/inner.component';
import { NoWhereComponent } from '../../../fixtures/components/no-where.component';
import { OuterComponent } from '../../../fixtures/components/outer.component';
import { createOuterComponentFixture } from '../../../fixtures/helpers/configuration/create-outer-component-fixture';
import { validateInstanceType } from '../../../fixtures/helpers/validators/validate-instance-type';

describe('findComponent', () => {
  let fixture: ComponentFixture<OuterComponent>;

  beforeEach(async () => {
    fixture = await createOuterComponentFixture();
    fixture.detectChanges();
  });

  it('should find InnerComponent instance by selector', () => {
    const inner = findComponent<InnerComponent>(fixture, 'app-inner');
    validateComponentInstance(inner);
  });

  it('should find InnerComponent instance by directive', () => {
    const inner = findComponent(fixture, InnerComponent);
    validateComponentInstance(inner);
  });

  it('should not find component instance by selector', () => {
    expect(() => findComponent<NoWhereComponent>(fixture, 'app-no-where'))
      .toThrowError('Cannot find one DebugElement with : selector "app-no-where".');
  });

  it('should not find component instance by directive', () => {
    expect(() => findComponent(fixture, NoWhereComponent))
      .toThrowError('Cannot find one DebugElement with : directive "NoWhereComponent".');
  });

  function validateComponentInstance(component: unknown): void {
    validateInstanceType(component, InnerComponent);
  }
});
