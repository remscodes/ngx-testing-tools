import { buildJasmineDone } from '../../../../lib/common/jasmine/jasmine-done';

describe('doneFactory', () => {
  const mockDone: DoneFn = () => {};
  mockDone.fail = () => {};

  it('should done', () => {
    expect(() => buildJasmineDone(mockDone, () => {})()).not.toThrowError();
  });

  it('should fail', () => {
    expect(() => buildJasmineDone(mockDone, () => {}).fail('Failed')).not.toThrowError('Failed');
  });
});
