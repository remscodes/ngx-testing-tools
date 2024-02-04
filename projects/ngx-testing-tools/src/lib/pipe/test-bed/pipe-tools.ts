import { PipeTransform } from '@angular/core';
import { buildBaseTools } from '../../common/test-bed/base/base-tools';
import { VerifyTools } from '../verify/models/verify-tools.model';
import { buildVerifyTools } from '../verify/verify-tools';
import { PipeTools } from './models';
import { PipeTestBedFactory } from './pipe-test-bed-factory';

export function buildPipeTools<T extends PipeTransform>(factory: PipeTestBedFactory<T>): PipeTools<T> {
  const pipe: T = factory['instance'];
  const { injected, injector, rx } = buildBaseTools(factory);
  const verify: VerifyTools = buildVerifyTools(pipe);

  return { injected, injector, pipe, rx, verify };
}
