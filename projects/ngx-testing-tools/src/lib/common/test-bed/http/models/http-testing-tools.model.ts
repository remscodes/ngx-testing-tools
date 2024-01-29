import { HttpTools } from './http-tools.model';

export interface HttpTestingTools {
  /**
   * Only when the test bed option `httpTesting` is `true`.
   */
  http: HttpTools;
}
