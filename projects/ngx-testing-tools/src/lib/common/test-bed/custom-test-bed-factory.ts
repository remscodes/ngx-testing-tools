import { ProviderToken, Type } from '@angular/core';
import { TestBed, TestBedStatic } from '@angular/core/testing';
import { AnyProvider, Importation } from '../../component/test-bed/models/metadata-type.model';
import { MaybeArray, NonEmptyString, PrettyMerge } from '../../shared.model';
import { makeArray } from '../../util/array.util';
import { CustomTestBedOptions } from './models/custom-test-bed-options.model';
import { EnhancedJasmineCallback } from './models/enhanced-jasmine-callback.model';
import { InjectionStore } from './store/models/injected-store.model';

export abstract class CustomTestBedFactory<Instance, Store extends InjectionStore = InjectionStore> {

  protected constructor(
    protected described: Type<Instance>,
    options: CustomTestBedOptions = {},
  ) {
    const { autoCompile = true, checkCreate = true } = options;
    if (autoCompile) this.compileEach();
    if (checkCreate) this.shouldCreate();
  }

  protected testBed: TestBedStatic = TestBed;

  protected imports: Set<Importation> = new Set();
  protected providers: Set<AnyProvider> = new Set();

  protected injectedMap: Map<string, ProviderToken<any>> = new Map();

  /**
   * Imports one module or one standalone component / directive / pipe into the custom test bed.
   */
  public import(importation: Importation): this
  /**
   * Imports many modules or many standalone components / directives / pipes into the custom test bed.
   */
  public import(imports: Importation[]): this
  public import(oneOrManyImports: MaybeArray<Importation>): this {
    makeArray(oneOrManyImports).forEach(v => this.imports.add(v));
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
    makeArray(oneOrManyProviders).forEach(v => this.providers.add(v));
    return this;
  }

  /**
   * Injects an instance by token into the custom test bed.
   *
   * Retrieve it into the tools `injected` by autocompletion.
   * @param name the key to access the instance.
   * @param token the provider token.
   */
  public inject<key extends string, T>(name: NonEmptyString<key>, token: ProviderToken<T>): CustomTestBedFactory<Instance, InjectionStore<PrettyMerge<Store['injected'] & { [k in key]: T }>>> {
    this.injectedMap.set(name, token);
    return this;
  }

  /**
   * Manually compiles the custom test bed before each test (when `autoCompile = false`).
   *
   * **To be called outside jasmine `beforeEach` callback.**
   * @see compile
   */
  public compileEach(): void {
    beforeEach(() => this.compile());
  }

  /**
   * Manually compiles the custom test bed to make enhanced tools available (when `autoCompile = false`).
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
  public abstract setup<Action extends EnhancedJasmineCallback<any>>(action: Action): jasmine.ImplementationCallback

  /**
   * Invokes the redondant "should create" test generated by Angular schematic.
   *
   * **To be called outside jasmine `it` callback.**
   */
  public abstract shouldCreate(): void;

  protected injectDescribed(): Instance {
    return this.testBed.inject(this.described);
  }
}
