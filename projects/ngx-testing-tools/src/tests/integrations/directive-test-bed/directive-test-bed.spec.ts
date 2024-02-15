import { Component } from '@angular/core';
import { directiveTestBed } from '../../../lib';
import { HighlightDirective } from '../../fixtures/directives/highlight.directive';

describe('DirectiveTestBed', () => {

  @Component({
    template: `<span id="my-text" [highlight]="color">My Text</span>`,
    standalone: true,
    imports: [HighlightDirective],
  })
  class HostComponent {
    public color: string | undefined;
  }

  describe('', () => {
    const tb = directiveTestBed(HighlightDirective, HostComponent);

    it('should ', tb(({ host, fixture, directive, query }) => {
      const span: HTMLSpanElement = query.findElement('#my-text');

      expect(span.style.backgroundColor).toEqual(directive['defaultColor']);

      host.color = 'red';
      fixture.detectChanges();

      expect(span.style.backgroundColor).toEqual('red');
    }));
  });
});
