import { Component, EnvironmentProviders, ModuleWithProviders, Provider, ProviderToken, Type } from '@angular/core';
import { ComponentFixture, TestBed, TestBedStatic, TestModuleMetadata } from '@angular/core/testing';
import { MaybeArray, Merge, NonEmptyString, Nullable } from '../../models/shared.model';
import { assertComponent } from './assert-component';
import { assertComponentFixture } from './assert-fixture';
import { getComponentAnnotation } from './component-annotation';
import { ComponentTestBed } from './models';

export class ComponentTestBedFactory<ComponentType, Injected extends {}> {

  public constructor(
    private rootComponent: Type<ComponentType>,
  ) {
    this.annotation = getComponentAnnotation(rootComponent);
    assertComponent(rootComponent, this.annotation);
  }

  private readonly annotation: Nullable<Component>;

  private testBed: TestBedStatic = TestBed;
  private fixture: ComponentFixture<ComponentType> = null!;
  private injected: Map<ProviderToken<any>, string> = new Map();

  /**
   * Import one module or one standalone component / directive / pipe into the `ComponentTestBed`.
   */
  public import(importation: Type<any> | ModuleWithProviders<any>): this
  /**
   * Import many modules or many standalone components / directives / pipes into the `ComponentTestBed`.
   */
  public import(imports: (Type<any> | ModuleWithProviders<any>)[]): this
  public import(oneOrManyImports: MaybeArray<Type<any> | ModuleWithProviders<any>>): this {
    return this.configure('imports', oneOrManyImports);
  }

  /**
   * Add one provider into the `ComponentTestBed`.
   */
  public provide(provider: Provider | EnvironmentProviders): this
  /**
   * Add many providers into the `ComponentTestBed`.
   */
  public provide(providers: (Provider | EnvironmentProviders)[]): this
  public provide(oneOrManyProviders: MaybeArray<Provider | EnvironmentProviders>): this {
    return this.configure('providers', oneOrManyProviders);
  }

  /**
   * Declare one non standalone component, directive or pipe into the `ComponentTestBed`.
   */
  public declare(declaration: Type<any>): this
  /**
   * Declare many non standalone components, directives and pipes into `ComponentTestBed`.
   */
  public declare(declarations: Type<any>[]): this
  public declare(oneOrManyDeclarations: MaybeArray<Type<any>>): this {
    return this.configure('declarations', oneOrManyDeclarations);
  }

  public inject<key extends string, T>(name: NonEmptyString<key>, token: ProviderToken<T>): ComponentTestBed<ComponentType, Merge<Injected & { [k in key]: T }>> {
    this.injected.set(token, name);
    return this as any;
  }

  private configure(key: keyof TestModuleMetadata, itemS: MaybeArray<unknown>): this {
    const defs: unknown[] = Array.isArray(itemS) ? itemS : [itemS];
    this.testBed.configureTestingModule({ [key]: defs });
    return this;
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

  /**
   * Compile the `ComponentTestBed` to create the `rootComponent` fixture.
   */
  public async compile(): Promise<void> {
    (this.annotation?.standalone)
      ? this.import(this.rootComponent)
      : this.declare(this.rootComponent);

    await this.testBed.compileComponents();

    this.fixture = this.testBed.createComponent(this.rootComponent);
  }
}
