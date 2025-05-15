import { itShouldCreateResolver, resolverTestBed } from '../../../lib';
import { POST_RESOLVER, PostResolver } from '../../fixtures/resolvers/post.resolver';

describe('itShouldCreateResolver', () => {

  describe('with function', () => {
    itShouldCreateResolver(POST_RESOLVER);
  });

  describe('with class', () => {
    itShouldCreateResolver(PostResolver);
  });
});

describe('resolverTestBed', () => {

  describe('with function', () => {

    const tb = resolverTestBed(POST_RESOLVER);

    it('should get output', tb(async ({ invoke }) => {
      const res = await invoke();
      expect(res.title).toEqual('MyPost');
    }));
  });

  describe('with class', () => {
    const tb = resolverTestBed(PostResolver);

    it('should get output', tb(async ({ invoke }) => {
      const res = await invoke();
      expect(res.title).toEqual('MyPost');
    }));
  });
});
