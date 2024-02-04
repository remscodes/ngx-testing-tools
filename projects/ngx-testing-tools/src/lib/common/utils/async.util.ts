import { MaybePromise } from '../shared.models';

export async function postAsync(value: MaybePromise<unknown>, postAction: () => void): Promise<void> {
  await value;
  postAction();
}
