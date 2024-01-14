import { testPipeValues } from 'ngx-testing-extra';
import { PrefixPipe } from './prefix.pipe';

describe('PrefixPipe', () => {
  const pipe = new PrefixPipe();

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  testPipeValues(pipe, {});
});
