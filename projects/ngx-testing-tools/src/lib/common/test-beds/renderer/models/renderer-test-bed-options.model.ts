import { SchemaMetadata } from '@angular/core';
import { BaseTestBedOptions } from '../../base/models/base-test-bed-options.model';
import { Declaration } from '../../models/metadata-type.models';

export interface RendererTestBedOptions extends BaseTestBedOptions {
  /**
   * @default []
   */
  declarations?: Declaration[],
  /**
   * The schema definitions.
   * @default []
   * @see {@link CUSTOM_ELEMENTS_SCHEMA}
   * @see {@link NO_ERRORS_SCHEMA}
   */
  schemas?: SchemaMetadata[];
  /**
   * Performs changes detection before assertion.
   * @default true
   */
  startDetectChanges?: boolean;
  /**
   * Disables Angular animations with `provideNoopAnimations()`.
   * @default true
   */
  noopAnimations?: boolean;
  /**
   * Useful when you only want to test the logic of the described component.
   *
   * If enabled, no template will be rendered and no change detections will be performed.
   * @default false
   */
  noTemplate?: boolean;
}
