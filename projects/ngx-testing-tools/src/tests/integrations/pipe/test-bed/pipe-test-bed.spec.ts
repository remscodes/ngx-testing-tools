import { pipeTestBed } from '../../../../lib';
import { PrefixPipe } from '../../../fixtures/pipes/prefix.pipe';

describe('PipeTestBed', () => {
  const tb = pipeTestBed(PrefixPipe);

  it('should ', tb(({ pipe }) => {
    const result = pipe.transform('suffix', 'my-');
    expect(result).toEqual('my-suffix');
  }));
});
