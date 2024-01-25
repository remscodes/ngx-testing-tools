import { SchemaMetadata } from '@angular/core';
import { CustomTestBedOptions } from '../../../common/test-bed/models/custom-test-bed-options.model';
import { ComponentExtraOptions } from './component-extra-options.model';

export interface ComponentTestBedOptions extends ComponentExtraOptions, CustomTestBedOptions {
  /**
   * @default []
   */
  schemas?: SchemaMetadata[];
  /**
   * Enable or disable angular animations.
   * @default true
   */
  noopAnimations?: boolean;
}
