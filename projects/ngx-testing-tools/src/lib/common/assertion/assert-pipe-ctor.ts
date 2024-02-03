import { Pipe, Type } from '@angular/core';
import { Nullable } from '../../shared.model';
import { getPipeAnnotation } from '../annotation/pipe-annotation';
import { throwCtorError } from '../error/throw-ctor-error';

export function assertPipeCtor(PipeCtor: Type<unknown>): void {
  const annotation: Nullable<Pipe> = getPipeAnnotation(PipeCtor);
  if (!annotation)
    throwCtorError({ name: PipeCtor.name ?? PipeCtor, type: 'Pipe', testBedName: 'PipeTestBed' });
}
