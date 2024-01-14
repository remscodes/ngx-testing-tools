# Pipe

## testPipeValues(pipe, record)

Test the pipe by successively transform the record's key and compare it to the expected record's value.

#### Parameters

- pipe
  - type: `extends PipeTransform`.
  - description: the pipe being tested.
- record
  - type: `Record<any, string>`.
  - description: the record with the current/expected as key/value. 

#### Example

```ts
import { Pipe, PipeTransform } from '@angular/core';
import { testPipeValues } from 'ngx-testing-tools';

@Pipe({ name: 'multiply', standalone: true })
class MultiplyPipe implements PipeTransform {
  transform(value: number): string {
    return `${value * 2}`;
  }
}

describe('MultiplyPipe', () => {
  const pipe = new MultiplyPipe();

  testPipeValues(pipe, {
    1: '2',
    2: '4',
  });
});
```
