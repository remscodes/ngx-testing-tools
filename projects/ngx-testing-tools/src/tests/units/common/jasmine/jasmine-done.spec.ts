import { buildJasmineDone } from '../../../../lib/common/jasmine/jasmine-done';

describe('doneFactory', () => {
  const mockDone: DoneFn = () => {};
  mockDone.fail = (message) => {
    if (message instanceof Error) throw message;
    if (typeof message === 'string') throw new Error(message);
    throw new Error('Failed test.');
  };

  const postAction = () => {};
  const done = buildJasmineDone(mockDone, postAction);

  it('should pass', () => {
    expect(() => done()).not.toThrowError();
  });

  it('should fail', () => {
    expect(() => buildJasmineDone(mockDone, postAction).fail('Failed')).toThrowError('Failed');
  });
});
