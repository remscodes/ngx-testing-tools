import { Component, ProviderToken, Type } from '@angular/core';
import { ComponentFixture, TestBed, TestBedStatic } from '@angular/core/testing';
import { MaybeArray, Merge, NonEmptyString, Nullable } from '../../models/shared.model';
import { assertComponent } from './assert-component';
import { assertComponentFixture } from './assert-fixture';
import { getComponentAnnotation } from './component-annotation';
import { buildComponentTools } from './component-tools';
import { ComponentTestBed } from './models';
import { AnyProvider, Declaration, Importation } from './models/metadata-type.model';
import { ComponentSetup } from './models/setup-fn.model';
import { InjectionStore } from './store';

export class ComponentTestBedFactory<ComponentType, Store extends InjectionStore = InjectionStore> {

  public constructor(
    private rootComponent: Type<ComponentType>,
  ) {
    const annotation: Nullable<Component> = getComponentAnnotation(rootComponent);
    assertComponent(rootComponent, annotation);

    (annotation?.standalone)
      ? this.import(this.rootComponent)
      : this.declare(this.rootComponent);
  }

  private testBed: TestBedStatic = TestBed;
  private fixture: ComponentFixture<ComponentType> = null!;

  private imports: Set<Importation> = new Set();
  private declarations: Set<Declaration> = new Set();
  private providers: Set<AnyProvider> = new Set();

  private injectedMap: Map<ProviderToken<any>, string> = new Map();

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

  /**
   * Declare one non standalone component, directive or pipe into the `ComponentTestBed`.
   */
  public declare(declaration: Declaration): this
  /**
   * Declare many non standalone components, directives and pipes into `ComponentTestBed`.
   */
  public declare(declarations: Declaration[]): this
  public declare(oneOrManyDeclarations: MaybeArray<Declaration>): this {
    makeArray(oneOrManyDeclarations).forEach(v => this.declarations.add(v));
    return this;
  }

  private async configureModule(): Promise<void> {
    this.testBed.configureTestingModule({
      imports: [...this.imports.values()],
      declarations: [...this.declarations.values()],
      providers: [...this.providers.values()],
    });

    await this.testBed.compileComponents();
  }

  /**
   * Inject an instance by token into the `ComponentTestBed`.
   *
   * Retrieve it into the `ComponentTools.injected` by autocompletion.
   * @param name the key to access the instance.
   * @param token the provider token.
   */
  public inject<key extends string, T>(name: NonEmptyString<key>, token: ProviderToken<T>): ComponentTestBed<ComponentType, InjectionStore<Merge<Store['injected'] & { [k in key]: T }>>> {
    this.injectedMap.set(token, name);
    return this as any;
  }

  /**
   * Compile the `ComponentTestBed` before each test.
   */
  public compileEach(): void {
    beforeEach(() => this.compile());
  }

  /**
   * Compile the `ComponentTestBed` to create the `rootComponent` fixture.
   */
  public async compile(): Promise<void> {
    await this.configureModule();
    this.fixture = this.testBed.createComponent(this.rootComponent);
  }

  /**
   * Not compatible with `beforeAll` and `afterAll`.
   */
  public setup(action: ComponentSetup<ComponentType, Store['injected']>): jasmine.ImplementationCallback {
    return (action.length > 1)
      ? (done: DoneFn) => action(buildComponentTools(this), done)
      : () => action(buildComponentTools(this), null!);
  }

  /**
   * Set up the redondant "should create" test generated by Angular schematic.
   *
   * **To be called outside jasmine `it` callback.**
   */
  public shouldCreate(): void {
    it('should create', () => {
      assertComponentFixture(this.fixture);
      expect(this.fixture.componentInstance).toBeTruthy();
    });
  }
}

function makeArray<T>(itemS: MaybeArray<T>): T[] {
  return (Array.isArray(itemS)) ? itemS : [itemS];
}
