import { Subject, Subscription } from 'rxjs';
import { MethodsOf } from '../../../shared.model';

type Remindable =
  | Subscription
  | Subject<any>

export class RxBox {

  private subs: Subscription[] = [];
  private subjects: Subject<any>[] = [];

  public set remind(value: Remindable) {
    (value instanceof Subscription)
      ? this.subs.push(value)
      : this.subjects.push(value);
  }

  public bigRemind(values: Remindable[]): void {
    values.forEach(v => (this.remind = v));
  }

  private cleanAll(): void {
    this.unsubscribe();
    this.complete();
  }

  private unsubscribe(): void {
    this.clean(this.subs, 'unsubscribe');
  }

  private complete(): void {
    this.clean(this.subjects, 'complete');
  }

  private clean<T>(array: T[], cleanFnKey: keyof MethodsOf<T>): void {
    array.forEach(v => (v[cleanFnKey] as () => void)());
    array.length = 0;
  }
}
