import { MaybePromise } from '../../shared.model';

export async function postAsync(value: MaybePromise<unknown>, postAction: () => void): Promise<void> {
  await value;
  postAction();
}
