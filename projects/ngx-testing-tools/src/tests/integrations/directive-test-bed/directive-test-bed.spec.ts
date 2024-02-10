import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
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

    it('should ', tb(({ host, fixture, directive }) => {
      const span: HTMLSpanElement = fixture.debugElement.query(By.css('#my-text')).nativeElement;

      expect(span.style.backgroundColor).toEqual(directive['defaultColor']);

      host.color = 'red';

      fixture.detectChanges();

      expect(span.style.backgroundColor).toEqual('red');
    }));
  });
});
