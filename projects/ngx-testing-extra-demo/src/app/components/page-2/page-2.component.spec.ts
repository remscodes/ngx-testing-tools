import { createExtraBed } from 'ngx-testing-extra';
import { Page2Component } from './page-2.component';

describe('Page2Component', () => {
  const bed = createExtraBed(Page2Component);
  beforeEach(() => bed.compile());

  bed.shouldCreate();

  it('should click', bed(({ instance, action }) => {
    expect(instance.clicked).toBeFalse();

    action.click('#my-span');

    expect(instance.clicked).toBeTrue();
  }));
});
