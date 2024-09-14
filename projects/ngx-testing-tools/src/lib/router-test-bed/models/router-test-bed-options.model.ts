import { BaseTestBedOptions } from '../../common/test-beds/base/models/base-test-bed-options.model';

export interface RouterTestBedOptions extends BaseTestBedOptions {
  /**
   * @default ''
   */
  initialUrl?: string;
  /**
   * Performs changes detection before assertion.
   * @default true
   */
  startDetectChanges?: boolean;
}
