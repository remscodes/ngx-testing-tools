export interface CustomTestBedOptions {
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
