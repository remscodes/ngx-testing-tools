import { Nullable } from '../../../shared.model';
import { postAsync } from '../../util/post-async';
import { BaseTools } from '../base/models/base-tools.model';
import { DeferredTools } from '../models/deferred-tools.model';
import { EnhancedJasmineCallback } from '../models/enhanced-jasmine-callback.model';
import { doneFactory } from './jasmine-done';

interface JasmineCallbackArgs<Tools extends BaseTools> {
  callback: EnhancedJasmineCallback<Tools>;
  deferredTools: DeferredTools<Tools>,
  preTest?: (tools: Tools) => void;
  postTest?: (tools: Tools) => void;
}

export function buildJasmineCallback<Tools extends BaseTools>(args: JasmineCallbackArgs<Tools>): jasmine.ImplementationCallback {
  const { callback, deferredTools, preTest, postTest } = args;

  const callbackWrapper = (done: Nullable<DoneFn>) => {
    const tools: Tools = deferredTools();

    preTest?.(tools);

    return (done)
      ? callback(tools, doneFactory(done, () => postTest?.(tools)))
      : postAsync(callback(tools, null!), () => postTest?.(tools));
  };

  return (callback.length > 1)
    ? (done: DoneFn) => callbackWrapper(done)
    : () => callbackWrapper(null);
}
