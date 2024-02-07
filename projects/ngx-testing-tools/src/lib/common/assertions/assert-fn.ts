export function assertFn(fn: unknown): void {
  if (typeof fn !== 'function')
    throw new ReferenceError(`The provided "${fn?.toString()}" is not a valid function.`);
}
