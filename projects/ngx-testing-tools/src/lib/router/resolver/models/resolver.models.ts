import { Observable } from 'rxjs';

export type ResolveReturn<T> =
  | Observable<T>
  | Promise<T>
  | T
