import { BaseTestBedOptions } from '../../common/test-beds/base/models/base-test-bed-options.model';
import { RendererTestBedOptions } from '../../common/test-beds/renderer/models/renderer-test-bed-options.model';

export interface RouterTestBedOptions extends BaseTestBedOptions, RouterTestStartDetectChanges {
  /**
   * @default ''
   */
  initialUrl?: string;
}

type RouterTestStartDetectChanges = Pick<RendererTestBedOptions, 'startDetectChanges'>;
