import { Pipe, PipeTransform } from '@angular/core';
import { testPipeValues } from '../../../lib/pipe';

describe('testPipeValues', () => {
  @Pipe({ name: 'multiply', standalone: true })
  class MultiplyPipe implements PipeTransform {
    public transform(value: number): string {
      return `${value * 2}`;
    }
  }

  const pipe: MultiplyPipe = new MultiplyPipe();

  testPipeValues(pipe, {
    1: '2',
    2: '4',
  });
});
