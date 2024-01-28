import { AnyProvider, Importation } from '../../models/metadata-type.model';

export interface BaseTestBedOptions {
  /**
   * @default []
   */
  imports?: Importation[];
  /**
   * @default []
   */
  providers?: AnyProvider[];
  /**
   * Automatically compiles the custom test bed for each test.
   * @default true
   */
  autoCompile?: boolean;
  /**
   * Automatically invokes the "should create" test.
   *
   * It checks if the provided `described` instance is truthy.
   * @default true
   */
  checkCreate?: boolean;
}
