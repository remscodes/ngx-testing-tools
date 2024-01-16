import { Component, EnvironmentProviders, ModuleWithProviders, Provider, Type } from '@angular/core';
import { ComponentFixture, TestBed, TestBedStatic, TestModuleMetadata } from '@angular/core/testing';
import { MaybeArray, Nullable } from '../../models/shared.model';
import { assertComponent } from './assert-component';
import { assertComponentFixture } from './assert-fixture';
import { getComponentAnnotation } from './component-annotation';

export class ComponentTestBedFactory<ComponentType> {

  public constructor(
    private rootComponent: Type<ComponentType>,
  ) {
    this.annotation = getComponentAnnotation(rootComponent);
    assertComponent(rootComponent, this.annotation);
  }

  private readonly annotation: Nullable<Component>;

  private testBed: TestBedStatic = TestBed;
  private fixture: ComponentFixture<ComponentType> = null!;

  /**
   * Import one standalone component, directive, pipe or module into the `ComponentTestBed`.
   * @param importation
   */
  public import(importation: Type<any> | ModuleWithProviders<any>): this
  /**
   * Import many standalone components, directives, pipes or module into the `ComponentTestBed`.
   * @param imports
   */
  public import(imports: (Type<any> | ModuleWithProviders<any>)[]): this
  public import(oneOrManyImports: MaybeArray<Type<any> | ModuleWithProviders<any>>): this {
    return this.configure('imports', oneOrManyImports);
  }

  /**
   * Add one provider into the `ComponentTestBed`.
   * @param provider
   */
  public provide(provider: Provider | EnvironmentProviders): this
  /**
   * Add many providers into the `ComponentTestBed`.
   * @param providers
   */
  public provide(providers: (Provider | EnvironmentProviders)[]): this
  public provide(oneOrManyProviders: MaybeArray<Provider | EnvironmentProviders>): this {
    return this.configure('providers', oneOrManyProviders);
  }

  /**
   * Declare one non standalone component, directive or pipe into the `ComponentTestBed`.
   * @param declaration
   */
  public declare(declaration: Type<any>): this
  /**
   * Declare many non standalone components, directives and pipes into `ComponentTestBed`.
   * @param declarations
   */
  public declare(declarations: Type<any>[]): this
  public declare(oneOrManyDeclarations: MaybeArray<Type<any>>): this {
    return this.configure('declarations', oneOrManyDeclarations);
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
