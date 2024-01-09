import { validateInstanceType } from './validate-instance-type';

interface ArrayValidatorOptions {
  size?: number;
}

export function validateArray(array: unknown[], opts: ArrayValidatorOptions = {}): void {
  const { size } = opts;

  validateInstanceType(array, Array);
  if (size !== undefined) expect(array.length).toEqual(size);
}
