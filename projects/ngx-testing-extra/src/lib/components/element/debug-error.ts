import { Type } from '@angular/core';

export function throwCannotFind(selectorOrDirective: string | Type<any>, many: boolean = false): never {
  const input: string = (typeof selectorOrDirective === 'string')
    ? `selector "${selectorOrDirective}"`
    : `directive "${selectorOrDirective.name}"`;

  const quantifier: string = (many)
    ? 'many'
    : 'one';

  throw new Error(`Cannot find ${quantifier} DebugElement with : ${input}.`);
}
