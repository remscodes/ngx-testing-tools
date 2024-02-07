import { ProviderToken, Type } from '@angular/core';
import { TestBed, TestBedStatic } from '@angular/core/testing';
import { assertInstance } from '../../assertions/assert-instance';
import { shouldCreate } from '../../expectations/should-create';
import { buildJasmineCallback } from '../../jasmine/jasmine-callback';
import { EnhancedJasmineCallback } from '../../jasmine/models/enhanced-jasmine-callback.model';
import { MaybeArray, NonEmptyString, PrettyMerge } from '../../shared.models';
import { BaseTools } from '../../tools/base/models/base-tools.model';
import { DeferredTools } from '../../tools/models/deferred-tools.model';
import { InjectionStore } from '../../tools/store/models/injected-store.model';
import { appendSet } from '../../utils/set.util';
import { AnyProvider, Importation } from '../models/metadata-type.models';
import { BaseTestBedOptions } from './models/base-test-bed-options.model';

export abstract class BaseTestBedFactory<
  InstanceType,
  Store extends InjectionStore = InjectionStore,
  Tools extends BaseTools = BaseTools
> {

  protected constructor(
    protected described: Type<InstanceType>,
    options: BaseTestBedOptions = {},
  ) {
    const {
      imports = [],
      providers = [],
      autoCompile = true,
      checkCreate = true,
    } = options;

    this.imports = new Set(imports);
    this.providers = new Set(providers);

    if (autoCompile) this.compileEach();
    if (checkCreate) this.shouldCreate();
  }

  protected testBed: TestBedStatic = TestBed;

  protected _instance: InstanceType = null!;

  protected get instance(): InstanceType {
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
  public inject<key extends string, T>(name: NonEmptyString<key>, token: ProviderToken<T>): BaseTestBedFactory<InstanceType, InjectionStore<PrettyMerge<Store['injected'] & { [k in key]: T }>>> {
    this.injectedMap.set(name, token);
    return this;
  }

  /**
   * Manually compiles the custom test bed before each test (when `autoCompile = false`).
   *
   * **To be called outside jasmine `beforeEach` callback.**
   * @see compile
   * @deprecated Invoked by default with custom test beds, set `autoCompile` to `false` to disable it. Will be removed in v3.
   */
  public compileEach(): void {
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
  public setup(action: EnhancedJasmineCallback<Tools>): jasmine.ImplementationCallback {
    return buildJasmineCallback({
      callback: action,
      deferredTools: this.deferredTools,
    });
  }

  /**
   * Invokes the redondant "should create" test generated by Angular schematic.
   *
   * **To be called outside jasmine `it` callback.**
   * @deprecated Invoked by default with custom test beds, set `checkCreate` to `false` to disable it. Will be removed in v3.
   */
  public shouldCreate(): void {
    shouldCreate(() => this.instance);
  }
}
