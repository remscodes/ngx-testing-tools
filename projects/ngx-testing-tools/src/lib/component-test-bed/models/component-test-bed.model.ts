import { ProviderToken } from '@angular/core';
import { EnhancedJasmineCallback } from '../../common/jasmine/models/enhanced-jasmine-callback.model';
import { NonEmptyString, PrettyMerge } from '../../common/shared.models';
import { RendererTestBedOptions } from '../../common/test-beds/renderer/models/renderer-test-bed-options.model';
import { HttpOptions } from '../../common/tools/http/models/http-options.model';
import { InjectionStore } from '../../common/tools/store/models/injected-store.model';
import { ComponentTestBedFactory } from '../component-test-bed-factory';
import { ComponentTools } from '../tools';

export interface ComponentTestBed<T, S extends InjectionStore = InjectionStore> extends ComponentTestBedFactory<T, S> {
  (assertion: EnhancedJasmineCallback<ComponentTools<T, S['injected']>>, options?: ComponentExtraOptions): jasmine.ImplementationCallback;

  inject<key extends string, instance>(name: NonEmptyString<key>, token: ProviderToken<instance>): ComponentTestBed<T, InjectionStore<PrettyMerge<S['injected'] & { [k in key]: instance }>>>;
}

type ComponentExtraOptions =
  & Pick<RendererTestBedOptions, 'startDetectChanges'>
  & Pick<HttpOptions, 'verifyHttp'>
