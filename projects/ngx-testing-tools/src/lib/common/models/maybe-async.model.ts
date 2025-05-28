import { Observable } from 'rxjs';

export type MaybeAsync<T> = T | Observable<T> | Promise<T>;
