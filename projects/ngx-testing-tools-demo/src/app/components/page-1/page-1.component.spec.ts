import { componentTestBed } from 'ngx-testing-tools';
import { ButtonDirective, Page1Component } from './page-1.component';

describe('Page1Component', () => {
  const tb = componentTestBed(Page1Component);

  it('should click button by directive', tb(({ component, action }) => {
    expect(component.isClicked).toBeFalse();
    action.click(ButtonDirective);
    expect(component.isClicked).toBeTrue();
  }));
});
