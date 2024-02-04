import { HttpExtraOptions } from '../../common/tools/http/models/http-extra-options.model';

export interface ComponentExtraOptions extends HttpExtraOptions {
  /**
   * Run component fixture `detectChanges()` before assertion.
   * @default true
   */
  startDetectChanges?: boolean;
}
