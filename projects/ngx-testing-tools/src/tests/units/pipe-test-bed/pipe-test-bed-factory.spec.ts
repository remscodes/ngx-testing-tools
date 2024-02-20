import { Pipe, PipeTransform } from '@angular/core';
import { PipeTestBedFactory } from '../../../lib/pipe-test-bed/pipe-test-bed-factory';

describe('PipeTestBedFactory default options', () => {
  @Pipe({ name: 'foo' })
  class FooPipe implements PipeTransform{
    public transform(value: any, ...args: any): any {}
  }

  new PipeTestBedFactory(FooPipe);
});
