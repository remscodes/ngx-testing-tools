import { createExtraBed } from 'ngx-testing-extra';
import { Page2Component } from './page-2.component';

describe('Page2Component', () => {
  const bed = createExtraBed(Page2Component);
  beforeEach(() => bed.compile());

  bed.shouldCreate();

  it('should check', bed(({ instance }) => {
    expect(instance.checked).toBeFalse();
    instance.checked = true;
    expect(instance.checked).toBeTrue();
  }));

  it('should check again', bed(({ instance, query, action }) => {
    expect(instance.checked).toBeFalse();
    instance.checked = true;
    expect(instance.checked).toBeTrue();

    action.click('#my-span');

    const span: HTMLSpanElement = query.findElement('#my-span');
    console.log(span);
  }));
});
