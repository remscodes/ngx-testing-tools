import { ProviderToken, Type } from '@angular/core';
import { TestBed, TestBedStatic } from '@angular/core/testing';
import { assertInstance } from '../../assertions/assert-instance';
import { shouldCreate } from '../../expectations/should-create';
import { buildJasmineCallback } from '../../jasmine/jasmine-callback';
import { EnhancedJasmineCallback } from '../../jasmine/models/enhanced-jasmine-callback.model';
import { JasmineCallback } from '../../jasmine/models/jasmine-callback.model';
import { MaybeArray, NonEmptyString, PrettyMerge } from '../../shared.models';
import { BaseTools } from '../../tools/base/models/base-tools.model';
import { DeferredTools } from '../../tools/models/deferred-tools.model';
import { InjectionStore } from '../../tools/store/models/injected-store.model';
import { appendSet } from '../../utils/set.util';
import { AnyProvider, Importation } from '../models/metadata-type.models';
import { BaseTestBedOptions } from './models/base-test-bed-options.model';

export abstract class BaseTestBedFactory<
  DescribedType,
  Store extends InjectionStore = InjectionStore,
  Tools extends BaseTools = BaseTools
> {

  protected constructor(
    protected described: Type<DescribedType>,
    options: BaseTestBedOptions,
  ) {
    const {
      imports = [],
      providers = [],
      autoCompile = true,
      checkCreate = true,
    } = options;

    this.imports = new Set(imports);
    this.providers = new Set(providers);

    if (autoCompile) this._compileEach();
    if (checkCreate) this._shouldCreate();
  }

  protected testBed: TestBedStatic = TestBed;

  private _instance: DescribedType = null!;

  protected get instance(): DescribedType {
    assertInstance(this._instance, this.described);
    return this._instance;
  }

  protected abstract deferredTools: DeferredTools<Tools>;

  protected injectedMap: Map<string, ProviderToken<any>> = new Map();

  protected imports: Set<Importation>;
  protected providers: Set<AnyProvider>;

  protected injectDescribed(): void {
    this._instance = this.testBed.inject(this.described);
  }

  /**
   * Imports one module or one standalone component / directive / pipe into the custom test bed.
   */
  public import(importation: Importation): this
  /**
   * Imports many modules or many standalone components / directives / pipes into the custom test bed.
   */
  public import(imports: Importation[]): this
  public import(oneOrManyImports: MaybeArray<Importation>): this {
    appendSet(this.imports, oneOrManyImports);
    return this;
  }

  /**
   * Adds one provider into the custom test bed.
   */
  public provide(provider: AnyProvider): this
  /**
   * Adds many providers into the custom test bed.
   */
  public provide(providers: AnyProvider[]): this
  public provide(oneOrManyProviders: MaybeArray<AnyProvider>): this {
    appendSet(this.providers, oneOrManyProviders);
    return this;
  }

  /**
   * Injects an instance by token into the custom test bed.
   *
   * Retrieve it into the tools `injected` by autocompletion.
   * @param name the key to access the instance.
   * @param token the provider token.
   */
  public inject<key extends string, T>(name: NonEmptyString<key>, token: ProviderToken<T>): BaseTestBedFactory<DescribedType, InjectionStore<PrettyMerge<Store['injected'] & { [k in key]: T }>>> {
    this.injectedMap.set(name, token);
    return this;
  }

  public _compileEach(): void {
    globalThis.beforeEach(() => this.compile());
  }

  /**
   * Manually compiles the custom test bed to make enhanced tools available.
   *
   * To be used when `autoCompile = false`.
   *
   * **To be called inside jasmine `beforeEach` callback.**
   */
  public async compile(): Promise<void> {
    this.testBed.configureTestingModule({
      imports: [...this.imports.values()],
      providers: [...this.providers.values()],
    });
  }

  /**
   * Sets up extra stuffs using the enhanced tools.
   *
   * **Works only for `beforeEach` and `afterEach`**.
   */
  public setup(action: EnhancedJasmineCallback<Tools>): JasmineCallback {
    return buildJasmineCallback({
      callback: action,
      deferredTools: this.deferredTools,
    });
  }

  public _shouldCreate(): void {
    shouldCreate(() => this.instance);
  }
}
