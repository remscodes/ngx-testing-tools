import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Component, inject } from '@angular/core';
import { componentTestBed } from '../../../../lib/components';
import { InnerComponent } from '../../../fixtures/components/inner.component';
import { OuterComponent } from '../../../fixtures/components/outer.component';
import { validateArray } from '../../../fixtures/helpers/validators/validate-array';
import { AppService } from '../../../fixtures/services/app.service';

describe('componentTestBed', () => {

  describe('standalone root component', () => {
    const tb = componentTestBed(OuterComponent);
    tb.compileEach();
    tb.shouldCreate();
  });

  describe('non standalone root component', () => {
    @Component({ template: `` })
    class ClassicComponent {}

    const tb = componentTestBed(ClassicComponent);
    tb.compileEach();
    tb.shouldCreate();
  });

  describe('setup', () => {

    describe('beforeEach', () => {
      const tb = componentTestBed(OuterComponent)
        .inject('app', AppService);

      tb.compileEach();
      tb.shouldCreate();

      beforeEach(tb.setup(({ component }) => {
        component.innerClicked = true;
      }));

      it('should 1', tb(({ component, injected: {} }) => {
        expect(component.innerClicked).toBeTrue();
      }));

      it('should 2', tb(({ component, injected: {} }) => {
        expect(component.innerClicked).toBeTrue();
      }));
    });
  });

  describe('import', () => {
    const tb = componentTestBed(OuterComponent);

    beforeEach(() => tb.import(HttpClientTestingModule).compile());

    it('should import', tb(({ injector }) => {
      const httpc = injector.get(HttpTestingController);
      expect(httpc).toBeTruthy();
    }));
  });

  describe('provide', () => {
    @Component({ standalone: true, template: `` })
    class AppComponent {
      service = inject(AppService);
    }

    const tb = componentTestBed(AppComponent);
    beforeEach(() => tb.provide(AppService).compile());

    it('should provide', tb(({ injector }) => {
      const service = injector.get(AppService);
      expect(service).toBeTruthy();
    }));
  });

  describe('declare', () => {
    @Component({
      template: `
          <app-b/>
      `,
    })
    class AComponent {}

    @Component({ selector: 'app-b', template: `` })
    class BComponent {}

    const tb = componentTestBed(AComponent);
    beforeEach(() => tb.declare(BComponent).compile());

    tb.shouldCreate();
  });

  describe('query', () => {
    const tb = componentTestBed(OuterComponent);

    beforeEach(() => tb.compile());

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
  });

  describe('action', () => {
    const tb = componentTestBed(OuterComponent);

    beforeEach(() => tb.compile());

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
  });

  describe('inject method', () => {
    const tb = componentTestBed(OuterComponent)
      .inject('app', AppService);

    beforeEach(() => tb.compile());

    it('should inject into test bed', tb(({ injected: { app } }) => {
      expect(app).toBeTruthy();
      expect(app.info).toBeTrue();
    }));
  });

  describe('DoneFn and await/async support', () => {
    const tb = componentTestBed(OuterComponent);

    beforeEach(() => tb.compile());

    it('should support jasmine DoneFn', tb(({}, done: DoneFn) => {
      expect().nothing();
      done();
    }));

    it('should support jasmine DoneFn', tb(async ({}) => {
      await Promise.resolve();
      expect().nothing();
    }));
  });
});
