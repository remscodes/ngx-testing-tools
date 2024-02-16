import { Directive, Type } from '@angular/core';
import { getDirectiveAnnotation } from '../annotations/directive-annotation';
import { throwCtorError } from '../errors/throw-ctor-error';
import { Nullable } from '../shared.models';

export function assertDirectiveCtor(DirectiveCtor: Type<unknown>): void {
  const annotation: Nullable<Directive> = getDirectiveAnnotation(DirectiveCtor);
  if (!annotation)
    throwCtorError({ name: DirectiveCtor.name ?? DirectiveCtor, type: 'Directive', testBedName: 'DirectiveTestBed' });
}
