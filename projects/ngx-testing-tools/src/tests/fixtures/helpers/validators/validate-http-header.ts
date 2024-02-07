import { HttpHeaders } from '@angular/common/http';
import { Nullable } from '../../../../lib/common/shared.models';

interface HeaderExpectations {
  name: string;
  value: Nullable<string>;
}

export function validateHeader(headers: HttpHeaders, expects: HeaderExpectations): void {
  const { name, value } = expects;
  expect(headers.get(name)).toEqual(value);
}
