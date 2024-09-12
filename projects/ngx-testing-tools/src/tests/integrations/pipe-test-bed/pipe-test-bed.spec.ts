import { itShouldCreatePipe, pipeTestBed } from '../../../lib';
import { PrefixPipe } from '../../fixtures/pipes/prefix.pipe';

describe('itShouldCreatePipe', () => {
  itShouldCreatePipe(PrefixPipe);
});

describe('pipeTestBed', () => {

  describe('setup', () => {
    const tb = pipeTestBed(PrefixPipe);

    beforeEach(tb.setup(({ pipe }) => {
      pipe.state = true;
    }));

    it('should ', tb(({ pipe }) => {
      expect(pipe.state).toBeTrue();
    }));
  });

  describe('verify', () => {
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
});
