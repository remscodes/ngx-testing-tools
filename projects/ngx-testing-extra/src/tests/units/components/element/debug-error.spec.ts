import { throwCannotFind } from '../../../../lib/components/element/debug-error';
import { NoWhereDirective } from '../../../fixtures/directives/no-where.directive';

describe('throwCannotFind', () => {

  it('should throw specific error messages', () => {
    expect(() => throwCannotFind('button'))
      .toThrowError('Cannot find one DebugElement with : selector "button".');

    expect(() => throwCannotFind(NoWhereDirective, true))
      .toThrowError('Cannot find many DebugElement with : directive "NoWhereDirective".');
  });
});
