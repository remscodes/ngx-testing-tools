import { componentTestBed } from 'ngx-testing-extra';
import { Page2Component } from './page-2.component';

describe('Page2Component', () => {
  const tb = componentTestBed(Page2Component);

  beforeEach(() => tb.compile());

  tb.shouldCreate()

  it('should click', tb(({ component, action }) => {
    expect(component.clicked).toBeFalse();

    action.click('#my-span');

    expect(component.clicked).toBeTrue();
  }));
});
