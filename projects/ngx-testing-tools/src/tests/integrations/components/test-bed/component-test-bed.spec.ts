import { Component } from '@angular/core';
import { componentTestBed } from '../../../../lib/components';
import { InnerComponent } from '../../../fixtures/components/inner.component';
import { OuterComponent } from '../../../fixtures/components/outer.component';
import { validateArray } from '../../../fixtures/helpers/validators/validate-array';
import { AppService } from '../../../fixtures/services/app.service';

describe('componentTestBed', () => {

  describe('standalone', () => {
    const tb = componentTestBed(OuterComponent);

    beforeEach(() => tb.compile());

    tb.shouldCreate();

    it('should click', tb(({ component, action }) => {
      expect(component.clicked).toBeFalse();
      action.click('#my-outer-button');
      expect(component.clicked).toBeTrue();
    }));

    it('should emit InnerComponent output', tb(({ component, action }) => {
      expect(component.innerClicked).toBeFalse();
      action.emitOutput(InnerComponent, 'clicked', true);
      expect(component.innerClicked).toBeTrue();
    }));

    it('should find InnerComponent instance', tb(({ query }) => {
      expect(query.findComponent(InnerComponent)).toBeTruthy();
    }));

    it('should find InnerComponent native element', tb(({ query }) => {
      expect(query.findElement(InnerComponent)).toBeTruthy();
    }));

    it('should find InnerComponent debug element', tb(({ query }) => {
      expect(query.findDebugElement(InnerComponent)).toBeTruthy();
    }));

    it('should find all InnerComponent instances', tb(({ component, fixture, query }) => {
      component.extraInner = true;
      fixture.detectChanges();
      validateArray(query.findAllComponents(InnerComponent), { size: 2 });
    }));

    it('should find all InnerComponent native elements', tb(({ component, fixture, query }) => {
      component.extraInner = true;
      fixture.detectChanges();
      validateArray(query.findAllElements(InnerComponent), { size: 2 });
    }));

    it('should find all InnerComponent debug elements', tb(({ component, fixture, query }) => {
      component.extraInner = true;
      fixture.detectChanges();
      validateArray(query.findAllDebugElements(InnerComponent), { size: 2 });
    }));

    it('should support jasmine DoneFn', tb(({}, done: DoneFn) => {
      expect().nothing();
      done();
    }));
  });

  describe('classic', () => {
    @Component({ template: `` })
    class ClassicComponent {}

    const tb = componentTestBed(ClassicComponent);
    beforeEach(() => tb.compile());

    tb.shouldCreate();
  });

  describe('inject method', () => {
    const tb = componentTestBed(OuterComponent)
      .inject('app', AppService);

    beforeEach(() => tb.compile());

    tb.shouldCreate();

    it('should inject into test bed', tb(({ injected: { app } }) => {
      expect(app).toBeTruthy();
      expect(app.info).toBeTrue();
    }));
  });
});