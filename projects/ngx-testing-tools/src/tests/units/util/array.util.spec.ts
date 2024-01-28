import { makeArray } from '../../../lib/util/array.util';
import { validateArray } from '../../fixtures/helpers/validators/validate-array';

describe('makeArray', () => {

  it('should equal', () => {
    validateArray(makeArray(1), { size: 1, equal: [1] });

  });

  it('should equal', () => {
    validateArray(makeArray([1, 2]), { size: 2, equal: [1, 2] });
  });
});
