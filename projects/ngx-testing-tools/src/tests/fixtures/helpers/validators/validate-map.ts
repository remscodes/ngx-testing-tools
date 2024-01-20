import { validateInstanceType } from './validate-instance-type';

interface MapExpectations {
  size?: number;
  entries?: Record<any, any>;
}

export function validateMap(map: Map<unknown, unknown>, expects: MapExpectations = {}): void {
  const { size, entries } = expects;

  validateInstanceType(map, Map);
  if (size !== undefined) expect(map.size).toEqual(size);
  if (entries !== undefined) expect([...map.entries()]).toEqual(Object.entries(entries));
}
