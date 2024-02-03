import { PipeTransform } from '@angular/core';
import { VerifyTools } from './models/verify-tools.model';

export function buildVerifyTools<T extends PipeTransform>(pipe: T) {
  const verify: VerifyTools = ({ expected, data, parameters }) => {
    expect(pipe.transform(data, ...parameters)).toEqual(expected);
  };

  verify.many = (matchers) => {
    matchers.forEach(({ expected, data, parameters }) => {
      verify({ expected, data, parameters });
    });
  };

  return verify;
}

