import { pipeTestBed } from '../../../../lib';
import { PrefixPipe } from '../../../fixtures/pipes/prefix.pipe';

describe('PipeTestBed', () => {
  const tb = pipeTestBed(PrefixPipe);

  it('should ', tb(({ pipe }) => {
    const result = pipe.transform('suffix', 'my-');
    expect(result).toEqual('my-suffix');
  }));

  it('should verify', tb(({ verify }) => {
    verify({ data: 'suffix', parameters: ['my-'], expected: 'my-suffix' });

    verify.many([
      { data: 'suffix', parameters: ['a-'], expected: 'a-suffix' },
      { data: 'suffix', parameters: ['a-', '-b'], expected: 'a-suffix-b' },
    ]);
  }));
});
