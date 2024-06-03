import { Component } from '@angular/core';
import { directiveTestBed } from '../../../lib';
import { HighlightDirective } from '../../fixtures/directives/highlight.directive';

describe('directiveTestBed', () => {

  @Component({
    template: `<span id="my-text" [highlight]="color">My Text</span>`,
    standalone: true,
    imports: [HighlightDirective],
  })
  class HostComponent {
    public foo: boolean = false;
    public color: string | undefined;
  }

  describe('DoneFn and await/async support', () => {
    const tb = directiveTestBed(HighlightDirective, HostComponent);

    it('should support jasmine DoneFn', tb(({}, done: DoneFn) => {
      expect().nothing();
      done();
    }));

    it('should support jasmine async/await', tb(async ({}) => {
      await Promise.resolve();
      expect().nothing();
    }));
  });

  describe('should change span backgroundColor when host `color` change', () => {
    const tb = directiveTestBed(HighlightDirective, HostComponent);

    it('should ', tb(({ host, fixture, directive, query }) => {
      const span: HTMLSpanElement = query.findElement('#my-text');

      expect(span.style.backgroundColor).toEqual(directive['defaultColor']);

      host.color = 'red';
      fixture.detectChanges();

      expect(span.style.backgroundColor).toEqual('red');
    }));
  });

  describe('setup', () => {
    const tb = directiveTestBed(HighlightDirective, HostComponent, { checkCreate: false });

    beforeEach(tb.setup(({ host }) => {
      host.foo = true;
    }));

    afterEach(tb.setup(({ host }, done) => {
      host.foo = false;
      done();
    }));

    it('should be true', tb(({ host }) => {
      expect(host.foo).toBeTrue();
    }));
  });
});
