import { HttpOptions } from '../../common/test-bed/http/models/http-options.model';
import { RendererTestBedOptions } from '../../common/test-bed/renderer/models/renderer-test-bed-options.model';
import { ComponentExtraOptions } from './component-extra-options.model';

export interface ComponentTestBedOptions extends ComponentExtraOptions, HttpOptions, RendererTestBedOptions {
  /**
   * Useful when you only want to test the logic of the described component.
   *
   * If enabled, no template will be rendered and no change detections will be performed.
   * @default false
   */
  noTemplate?: boolean;
}
