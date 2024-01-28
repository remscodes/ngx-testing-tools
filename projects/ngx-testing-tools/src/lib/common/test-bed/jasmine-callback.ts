import { BaseTestBedFactory } from './base/base-test-bed-factory';
import { BaseTools } from './base/models/base-tools.model';
import { EnhancedJasmineCallback } from './models/enhanced-jasmine-callback.model';

export function buildJasmineCallback<
  Factory extends BaseTestBedFactory<unknown>,
  Callback extends EnhancedJasmineCallback<Tools>,
  Tools extends BaseTools = any,
>(
  factory: Factory,
  cb: Callback,
  toolsBuilder: (factory: Factory, ...args: any[]) => Tools,
  toolsBuilderArgs: any[] = [],
): jasmine.ImplementationCallback {
  return (cb.length > 1)
    ? (done: DoneFn) => cb(toolsBuilder(factory, ...toolsBuilderArgs), done)
    : () => cb(toolsBuilder(factory, ...toolsBuilderArgs), null!);
}
