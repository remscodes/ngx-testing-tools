import { BehaviorSubject, ReplaySubject, Subject, Subscription } from 'rxjs';
import { RxBox } from '../../../../lib/common/test-bed/rx/rx-box';
import { validateArray } from '../../../fixtures/helpers/validators/validate-array';

describe('RxBox', () => {
  let rx: RxBox;
  beforeEach(() => rx = new RxBox());

  it('should unsubscribe all supplied subscriptions', () => {
    const sub1 = new Subscription();
    const sub2 = new Subscription();
    const sub3 = new Subscription();

    rx.remind = sub1;
    validateArray(rx['subs'], { size: 1, equal: [sub1] });

    rx.bigRemind([sub2, sub3]);
    validateArray(rx['subs'], { size: 3, equal: [sub1, sub2, sub3] });

    rx['subs'].forEach(s => expect(s.closed).toBeFalse());

    rx.unsubscribe();
    expect(sub1.closed).toBeTrue();
    expect(sub2.closed).toBeTrue();
    expect(sub3.closed).toBeTrue();
    validateArray(rx['subs'], { size: 0 });
  });

  it('should complete all supplied subjects', () => {
    const subject1 = new Subject();
    const subject2 = new BehaviorSubject(1);
    const subject3 = new ReplaySubject();

    rx.remind = subject1;
    validateArray(rx['subjects'], { size: 1, equal: [subject1] });

    rx.bigRemind([subject2, subject3]);
    validateArray(rx['subjects'], { size: 3, equal: [subject1, subject2, subject3] });

    rx['subjects'].forEach(s => expect(s.isStopped).toBeFalse());

    rx.complete();
    expect(subject1.isStopped).toBeTrue();
    expect(subject2.isStopped).toBeTrue();
    expect(subject3.isStopped).toBeTrue();
    validateArray(rx['subjects'], { size: 0 });
  });
});
