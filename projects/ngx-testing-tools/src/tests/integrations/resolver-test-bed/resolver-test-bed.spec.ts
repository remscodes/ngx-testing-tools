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

    it('should ', tb(async ({ resolver }) => {
      const res = await resolver();
      res.title;
    }));
  });

  describe('with class', () => {
    const tb = resolverTestBed(PostResolver);

    it('should ', tb(async ({ resolver }) => {
      const res = await resolver.resolve();
      res.title;
    }));
  });
});
