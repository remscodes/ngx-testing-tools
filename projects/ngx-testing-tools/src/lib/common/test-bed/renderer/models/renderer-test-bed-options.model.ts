import { SchemaMetadata } from '@angular/core';
import { BaseTestBedOptions } from '../../base/models/custom-test-bed-options.model';

export interface RendererTestBedOptions extends BaseTestBedOptions {
  /**
   * @default []
   */
  schemas?: SchemaMetadata[];
  /**
   * Disable Angular animations.
   * @default true
   */
  noopAnimations?: boolean;
}
