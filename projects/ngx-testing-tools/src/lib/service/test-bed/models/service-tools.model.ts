import { CustomTools } from '../../../common/test-bed/models/custom-tools.model';

export interface ServiceTools<T, I extends {} = {}> extends CustomTools<I> {
  /**
   * Service instance.
   */
  service: T;
}
