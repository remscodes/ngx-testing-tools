export function validateInstanceType<T extends Function>(instance: unknown, InstanceCtor: T): void {
  expect(instance).toBeTruthy();
  expect(instance).toBeInstanceOf(InstanceCtor);
}
