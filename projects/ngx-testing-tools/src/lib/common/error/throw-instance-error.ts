interface InstanceErrorOptions {
  name: string;
}

export function throwInstanceError(options: InstanceErrorOptions): never {
  const { name } = options;
  throw new ReferenceError(`${name} instance is falsy. You need to set \`autoCompile = true\` (default) or set \`beforeEach(() => tb.compile());\` and \`autoCompile = false\` before running expectations.`);
}
