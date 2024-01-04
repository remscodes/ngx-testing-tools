import { testPipeValues } from '../../../../ngx-testing-extra/src/lib/pipe';
import { PrefixPipe } from './prefix.pipe';

describe('PrefixPipe', () => {
  const pipe = new PrefixPipe();

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  testPipeValues(pipe, {});
});
