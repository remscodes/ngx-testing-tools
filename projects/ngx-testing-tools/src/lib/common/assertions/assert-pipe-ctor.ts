import { Pipe, Type } from '@angular/core';
import { getPipeAnnotation } from '../annotations/pipe-annotation';
import { throwCtorError } from '../errors/throw-ctor-error';
import { Nullable } from '../shared.models';

export function assertPipeCtor(PipeCtor: Type<unknown>): void {
  const annotation: Nullable<Pipe> = getPipeAnnotation(PipeCtor);
  if (!annotation)
    throwCtorError({ name: PipeCtor.name ?? PipeCtor, type: 'Pipe', testBedName: 'PipeTestBed' });
}
