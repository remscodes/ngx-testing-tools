interface InstanceErrorOptions {
  name: string;
}

export function throwInstanceError(options: InstanceErrorOptions): never {
  const { name } = options;
  throw new ReferenceError(`${name} is falsy. You need to set \`autoCompile = true\` or use \`tb.compileEach();\` or use \`beforeEach(() => tb.compile());\` before running expectations.`);
}
