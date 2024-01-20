import { MaybeArray } from '../shared.model';

export function makeArray<T>(itemS: MaybeArray<T>): T[] {
  return (Array.isArray(itemS)) ? itemS : [itemS];
}
