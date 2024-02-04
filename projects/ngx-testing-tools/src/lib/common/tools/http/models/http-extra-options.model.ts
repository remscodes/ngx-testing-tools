export interface HttpExtraOptions {
  /**
   * When enabled, the assertion will end by `HttpTestingController.verify()`.
   *
   * Works only when `httpTesting` test bed option is `true`, otherwise has no effect.
   * @default true
   */
  verifyHttp?: boolean;
}
