import { validateInstanceType } from './validate-instance-type';

export function validateArrayOf2(array: unknown[]): void {
  validateInstanceType(array, Array);
  expect(array.length).toEqual(2);
}
