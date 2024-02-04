export type InjectionStore<T extends {} = {}> = {
  /**
   * Store from which we can retrieve injection instances created by the `inject()` method.
   * @see inject
   */
  injected: T;
}
