import { ComponentFixture } from '@angular/core/testing';
import { fromInjector } from '../../../lib/injector';
import { InnerComponent } from '../../fixtures/components/inner.component';
import { OuterComponent } from '../../fixtures/components/outer.component';
import { createOuterComponentFixture } from '../../fixtures/helpers/configuration/create-outer-component-fixture';
import { AppService } from '../../fixtures/services/app.service';

describe('fromInjector', () => {
  let fixture: ComponentFixture<OuterComponent>;

  beforeEach(async () => {
    fixture = await createOuterComponentFixture();
  });

  it('should get from injector', () => {
    expect(fromInjector(fixture, AppService)).toBeTruthy();
  });

  it('should not get from injector', () => {
    expect(() => fromInjector(fixture, InnerComponent))
      .toThrowError();
  });
});
