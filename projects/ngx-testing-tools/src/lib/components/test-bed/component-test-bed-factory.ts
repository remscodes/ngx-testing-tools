import { Component, DestroyRef, EnvironmentProviders, ModuleWithProviders, Provider, Type } from '@angular/core';
import { ComponentFixture, TestBed, TestBedStatic, TestModuleMetadata } from '@angular/core/testing';
import { fromInjector } from '../../injector';
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
  private destroyRef: DestroyRef = null!;

  public import(importation: Type<any> | ModuleWithProviders<any>): this
  public import(imports: (Type<any> | ModuleWithProviders<any>)[]): this
  public import(oneOrManyImports: MaybeArray<Type<any> | ModuleWithProviders<any>>): this {
    return this.configure('imports', oneOrManyImports);
  }

  public provide(provider: Provider | EnvironmentProviders): this
  public provide(providers: (Provider | EnvironmentProviders)[]): this
  public provide(oneOrManyProviders: MaybeArray<Provider | EnvironmentProviders>): this {
    return this.configure('providers', oneOrManyProviders);
  }

  public declare(declaration: Type<any>): this
  public declare(declarations: Type<any>[]): this
  public declare(oneOrManyDeclarations: MaybeArray<Type<any>>): this {
    return this.configure('declarations', oneOrManyDeclarations);
  }

  private configure(key: keyof TestModuleMetadata, itemS: MaybeArray<unknown>): this {
    const defs: unknown[] = Array.isArray(itemS) ? itemS : [itemS];
    this.testBed.configureTestingModule({ [key]: defs });
    return this;
  }

  public shouldCreate(): void {
    it('should create', () => {
      assertComponentFixture(this.fixture);
      expect(this.fixture.componentInstance).toBeTruthy();
    });
  }

  public async compile(): Promise<void> {
    (this.annotation?.standalone)
      ? this.import(this.rootComponent)
      : this.declare(this.rootComponent);

    await this.testBed.compileComponents();

    this.fixture = this.testBed.createComponent(this.rootComponent);
    this.destroyRef = fromInjector(this.fixture, DestroyRef);
  }
}
