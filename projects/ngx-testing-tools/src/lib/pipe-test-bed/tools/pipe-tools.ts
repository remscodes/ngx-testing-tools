import { PipeTransform } from '@angular/core';
import { buildBaseTools } from '../../common/tools/base/base-tools';
import { PipeTestBedFactory } from '../pipe-test-bed-factory';
import { PipeTools } from './models';
import { VerifyTools } from './verify/models/verify-tools.model';
import { buildVerifyTools } from './verify/verify-tools';

export function buildPipeTools<T extends PipeTransform>(factory: PipeTestBedFactory<T>): PipeTools<T> {
  const pipe: T = factory['instance'];
  const { injected, injector, rx } = buildBaseTools(factory);
  const verify: VerifyTools = buildVerifyTools(pipe);

  return { injected, injector, pipe, rx, verify };
}
