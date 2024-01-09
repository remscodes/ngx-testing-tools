import { componentTestBed } from 'ngx-testing-extra';
import { Page2Component } from './page-2.component';

describe('Page2Component', () => {
  const bed = componentTestBed(Page2Component);

  beforeEach(() => bed.compile());

  bed.shouldCreate();

  it('should click', bed(({ component, action }) => {
    expect(component.clicked).toBeFalse();

    action.click('#my-span');

    expect(component.clicked).toBeTrue();
  }));
});
