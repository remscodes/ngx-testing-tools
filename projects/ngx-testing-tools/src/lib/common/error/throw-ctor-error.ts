interface CtorErrorOptions {
  name: string;
  type: string;
  testBedName: string;
}

export function throwCtorError(options: CtorErrorOptions): never {
  const { name, type, testBedName } = options;
  throw new Error(`The provided "${name}" is not a ${type}. The ${testBedName} cannot be created.`);
}
