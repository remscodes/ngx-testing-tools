import { InterceptorTestBedFactory } from '../../../lib/interceptor-test-bed/interceptor-test-bed-factory';

describe('InterceptorTestBedFactory default options', () => {
  new InterceptorTestBedFactory((req, next) => next(req));
});
