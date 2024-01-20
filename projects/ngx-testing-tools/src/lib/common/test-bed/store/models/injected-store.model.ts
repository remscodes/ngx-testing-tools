export type InjectionStore<T extends {} = {}> = {
  /**
   * Store from which we can retrieve injection instances created by the `inject()` function.
   * @see inject
   */
  injected: T;
}
