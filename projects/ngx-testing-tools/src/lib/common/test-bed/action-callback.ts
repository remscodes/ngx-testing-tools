import { BaseTestBedFactory } from './base/base-test-bed-factory';
import { BaseTools } from './base/models/base-tools.model';
import { EnhancedJasmineCallback } from './models/enhanced-jasmine-callback.model';

export function buildJasmineCallback<
  Factory extends BaseTestBedFactory<unknown>,
  Callback extends EnhancedJasmineCallback<Tools>,
  Tools extends BaseTools = any,
>(
  factory: Factory,
  action: Callback,
  toolsBuilder: (factory: Factory) => Tools,
): jasmine.ImplementationCallback {
  return (action.length > 1)
    ? (done: DoneFn) => action(toolsBuilder(factory), done)
    : () => action(toolsBuilder(factory), null!);
}
