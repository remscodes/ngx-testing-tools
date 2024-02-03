import { appendSet } from '../../../lib/common/util/set.util';
import { validateSet } from '../../fixtures/helpers/validators/validate-set';

describe('appendSet', () => {

  it('should equal', () => {
    const set = new Set<number>();
    appendSet(set, 1);

    validateSet(set, { size: 1, values: [1] });
  });

  it('should equal', () => {
    const set = new Set<number>();
    appendSet(set, [1, 2]);

    validateSet(set, { size: 2, values: [1, 2] });
  });
});
