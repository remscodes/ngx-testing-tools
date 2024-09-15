import { ProviderToken } from '@angular/core';
import { EnhancedJasmineCallback } from '../../common/jasmine/models/enhanced-jasmine-callback.model';
import { JasmineCallback } from '../../common/jasmine/models/jasmine-callback.model';
import { NonEmptyString, PrettyMerge } from '../../common/shared.models';
import { RendererTestBedOptions } from '../../common/test-beds/renderer/models/renderer-test-bed-options.model';
import { InjectionStore } from '../../common/tools/store/models/injected-store.model';
import { DirectiveTestBedFactory } from '../directive-test-bed-factory';
import { DirectiveTools } from '../tools';

export interface DirectiveTestBed<T, H, S extends InjectionStore = InjectionStore> extends DirectiveTestBedFactory<T, H, S> {
  (assertion: EnhancedJasmineCallback<DirectiveTools<T, H, S['injected']>>, options?: DirectiveExtraOptions): JasmineCallback;

  inject<key extends string, instance>(name: NonEmptyString<key>, token: ProviderToken<instance>): DirectiveTestBed<T, H, InjectionStore<PrettyMerge<S['injected'] & { [k in key]: instance }>>>;
}

type DirectiveExtraOptions = Pick<RendererTestBedOptions, 'startDetectChanges'>
