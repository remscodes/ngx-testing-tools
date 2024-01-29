import { throwCtorError } from '../../../../lib/common/error/throw-ctor-error';

describe('throwCtorError', () => {

  it('should throw with specific message', () => {
    expect(() => throwCtorError({ name: 'AppDirective', type: 'Component', testBedName: 'ComponentTestBed' }))
      .toThrowError('The provided "AppDirective" is not a Component. The ComponentTestBed cannot be created.');
  });
});
