import { CustomTestBedFactory } from './custom-test-bed-factory';
import { CustomTools } from './models/custom-tools.model';
import { EnhancedJasmineCallback } from './models/enhanced-jasmine-callback.model';

export function buildJasmineCallback<
  Factory extends CustomTestBedFactory<unknown>,
  Callback extends EnhancedJasmineCallback<Tools>,
  Tools extends CustomTools = any,
>(
  factory: Factory,
  action: Callback,
  toolsBuilder: (factory: Factory) => Tools,
): jasmine.ImplementationCallback {
  return (action.length > 1)
    ? (done: DoneFn) => action(toolsBuilder(factory), done)
    : () => action(toolsBuilder(factory), null!);
}
