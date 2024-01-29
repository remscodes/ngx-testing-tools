import { doneFactory } from '../../../../lib/common/test-bed/jasmine-done';

describe('doneFactory', () => {
  const mockDone: any = () => {};
  mockDone.fail = () => {};

  it('should done', () => {
    expect(() => doneFactory(mockDone, () => {})()).not.toThrowError();
  });

  it('should fail', () => {
    expect(() => doneFactory(mockDone, () => {}).fail('Failed')).not.toThrowError('Failed');
  });
});
