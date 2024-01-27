import { MaybeArray } from '../shared.model';
import { makeArray } from './array.util';

export function appendSet<T>(set: Set<T>, itemS: MaybeArray<T>): void {
  makeArray(itemS).forEach(v => set.add(v));
}
