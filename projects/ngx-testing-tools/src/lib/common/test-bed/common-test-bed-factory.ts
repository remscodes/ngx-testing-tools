import { ProviderToken, Type } from '@angular/core';
import { TestBed, TestBedStatic } from '@angular/core/testing';
import { InjectionStore } from '../../components';
import { AnyProvider, Declaration, Importation } from '../../components/test-bed/models/metadata-type.model';
import { MaybeArray, NonEmptyString, PrettyMerge } from '../../models/shared.model';
import { makeArray } from '../../util/array.util';
import { EnhancedCallback } from './models/enhanced-callback.model';

export abstract class CommonTestBedFactory<Instance, Store extends InjectionStore = InjectionStore> {

  protected constructor(
    protected described: Type<Instance>,
  ) { }

  protected testBed: TestBedStatic = TestBed;

  protected imports: Set<Importation> = new Set();
  protected declarations: Set<Declaration> = new Set();
  protected providers: Set<AnyProvider> = new Set();

  protected injectedMap: Map<string, ProviderToken<any>> = new Map();

  /**
   * Import one module or one standalone component / directive / pipe into the `ComponentTestBed`.
   */
  public import(importation: Importation): this
  /**
   * Import many modules or many standalone components / directives / pipes into the `ComponentTestBed`.
   */
  public import(imports: Importation[]): this
  public import(oneOrManyImports: MaybeArray<Importation>): this {
    makeArray(oneOrManyImports).forEach(v => this.imports.add(v));
    return this;
  }

  /**
   * Add one provider into the `ComponentTestBed`.
   */
  public provide(provider: AnyProvider): this
  /**
   * Add many providers into the `ComponentTestBed`.
   */
  public provide(providers: AnyProvider[]): this
  public provide(oneOrManyProviders: MaybeArray<AnyProvider>): this {
    makeArray(oneOrManyProviders).forEach(v => this.providers.add(v));
    return this;
  }

  private configureModule(): void {
    this.testBed.configureTestingModule({
      imports: [...this.imports.values()],
      declarations: [...this.declarations.values()],
      providers: [...this.providers.values()],
    });
  }

  /**
   * Inject an instance by token into the `ComponentTestBed`.
   *
   * Retrieve it into the `ComponentTools.injected` by autocompletion.
   * @param name the key to access the instance.
   * @param token the provider token.
   */
  public inject<key extends string, T>(name: NonEmptyString<key>, token: ProviderToken<T>): CommonTestBedFactory<Instance, InjectionStore<PrettyMerge<Store['injected'] & { [k in key]: T }>>> {
    this.injectedMap.set(name, token);
    return this as any;
  }

  /**
   * Compile the test bed before each test.
   */
  public compileEach(): void {
    beforeEach(() => this.compile());
  }

  /**
   * Compile the `ComponentTestBed` to create the `rootComponent` fixture.
   */
  public async compile(): Promise<void> {
    this.configureModule();
  }

  /**
   * Setups extra stuffs using the `ComponentTestBed` enhanced tools.
   *
   * **Works only for `beforeEach` and `afterEach`**.
   */
  public setup<Action extends EnhancedCallback<any>>(action: Action): jasmine.ImplementationCallback {
    return null!;
  }

  /**
   * Set up the redondant "should create" test generated by Angular schematic.
   *
   * **To be called outside jasmine `it` callback.**
   */
  public shouldCreate(): void {}
}
