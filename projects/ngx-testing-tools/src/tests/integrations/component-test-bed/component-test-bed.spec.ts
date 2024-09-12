import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Component, inject } from '@angular/core';
import { componentTestBed, itShouldCreateComponent } from '../../../lib';
import { InnerComponent } from '../../fixtures/components/inner.component';
import { OuterComponent } from '../../fixtures/components/outer.component';
import { validateArray } from '../../fixtures/helpers/validators/validate-array';
import { AppService } from '../../fixtures/services/app.service';

describe('itShouldCreateComponent', () => {
  itShouldCreateComponent(OuterComponent);
});

describe('componentTestBed', () => {

  describe('standalone root component', () => {
    componentTestBed(OuterComponent);
  });

  describe('non-standalone root component', () => {
    @Component({ template: ``, standalone: false })
    class ClassicComponent {}

    componentTestBed(ClassicComponent);
  });

  describe('DoneFn and await/async support', () => {
    const tb = componentTestBed(OuterComponent, { checkCreate: false });

    it('should support jasmine DoneFn', tb(({}, done: DoneFn) => {
      expect().nothing();
      done();
    }));

    it('should support jasmine async/await', tb(async ({}) => {
      await Promise.resolve();
      expect().nothing();
    }));
  });

  describe('setup', () => {
    const tb = componentTestBed(OuterComponent, { checkCreate: false });

    beforeEach(tb.setup(({ component }) => {
      component.innerClicked = true;
    }));

    afterEach(tb.setup(({ component }, done) => {
      component.innerClicked = false;
      done();
    }));

    it('should be true', tb(({ component }) => {
      expect(component.innerClicked).toBeTrue();
    }));
  });

  describe('import', () => {
    const tb = componentTestBed(OuterComponent, { checkCreate: false })
      .import(HttpClientTestingModule);

    it('should import', tb(({ injector }) => {
      expect(() => injector.get(HttpTestingController)).not.toThrowError();
    }));
  });

  describe('provide', () => {
    @Component({ selector: 'app-root1', template: ``, standalone: true })
    class AppComponent {
      service = inject(AppService);
    }

    const tb = componentTestBed(AppComponent, { checkCreate: false })
      .provide(AppService);

    it('should provide', tb(({ injector }) => {
      expect(() => injector.get(AppService)).not.toThrowError();
    }));
  });

  describe('declare', () => {
    @Component({
      template: `
        <app-b/>
      `,
      standalone: false,
    })
    class AComponent {}

    @Component({ selector: 'app-b', template: ``, standalone: false })
    class BComponent {}

    const tb = componentTestBed(AComponent, { checkCreate: false })
      .declare(BComponent);

    tb.shouldCreate();
  });

  describe('query', () => {
    const tb = componentTestBed(OuterComponent, { checkCreate: false });

    describe('one', () => {

      it('should find InnerComponent instance', tb(({ query }) => {
        expect(query.findComponent(InnerComponent)).toBeTruthy();
      }));

      it('should find InnerComponent native element', tb(({ query }) => {
        expect(query.findElement(InnerComponent)).toBeTruthy();
      }));

      it('should find InnerComponent debug element', tb(({ query }) => {
        expect(query.findDebugElement(InnerComponent)).toBeTruthy();
      }));
    });

    describe('many', () => {

      beforeEach(tb.setup(({ component, fixture }) => {
        component.extraInner = true;
        fixture.detectChanges();
      }));

      it('should find all InnerComponent instances', tb(({ query }) => {
        validateArray(query.findAllComponents(InnerComponent), { size: 2 });
      }));

      it('should find all InnerComponent native elements', tb(({ query }) => {
        validateArray(query.findAllElements(InnerComponent), { size: 2 });
      }));

      it('should find all InnerComponent debug elements', tb(({ query }) => {
        validateArray(query.findAllDebugElements(InnerComponent), { size: 2 });
      }));
    });
  });

  describe('action', () => {
    const tb = componentTestBed(OuterComponent, { checkCreate: false });

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
    const tb = componentTestBed(OuterComponent, { checkCreate: false })
      .inject('app', AppService);

    it('should inject into test bed', tb(({ injected: { app } }) => {
      expect(app).toBeTruthy();
      expect(app.info).toBeTrue();
    }));
  });

  describe('no template option', () => {
    const tb = componentTestBed(OuterComponent, {
      checkCreate: false,
      noTemplate: true,
    });

    it('should have no template', tb(({ element }) => {
      expect(element).toBeFalsy();
    }));
  });

  describe('http testing', () => {
    const tb = componentTestBed(OuterComponent, {
      httpTesting: true,
      checkCreate: false,
    });

    it('should mock http', tb(({ http, rx }, done) => {
      const mockValue = 'mock';

      rx.remind = http.client.get('/test').subscribe({
        next: (value) => {
          expect(value).toEqual(mockValue);
          done();
        },
      });

      http.emitSuccessResponse({
        url: '/test',
        body: mockValue,
      });
    }));
  });
});
