import { Type } from '@angular/core';

type Quantifier =
  | 'one'
  | 'many'

export function throwCannotFind(selectorOrDirective: string | Type<any>, quantifier: Quantifier = 'one'): never {
  const input: string = (typeof selectorOrDirective === 'string')
    ? `selector "${selectorOrDirective}"`
    : `directive "${selectorOrDirective.name}"`;

  throw new Error(`Cannot find ${quantifier} DebugElement with : ${input}.`);
}
