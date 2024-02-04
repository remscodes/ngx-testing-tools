import { MaybeArray } from '../shared.models';

export function makeArray<T>(itemS: MaybeArray<T>): T[] {
  return (Array.isArray(itemS)) ? itemS : [itemS];
}
