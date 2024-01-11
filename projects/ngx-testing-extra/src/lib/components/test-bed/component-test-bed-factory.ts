import { DestroyRef, Type } from '@angular/core';
import { ComponentFixture, TestBed, TestBedStatic, TestModuleMetadata } from '@angular/core/testing';
import { fromInjector } from '../../injector';
import { MaybeArray } from '../../models/shared.model';
import { assertComponentFixture } from './assert-fixture';

export class ComponentTestBedFactory<ComponentType> {

  public constructor(
    private rootComponent: Type<ComponentType>,
  ) { }

  private testBed: TestBedStatic = TestBed;
  private fixture: ComponentFixture<ComponentType> = null!;
  private destroyRef: DestroyRef = null!;

  public import(imp: Type<any>): this
  public import(imps: Type<any>[]): this
  public import(oneOrManyImports: MaybeArray<Type<any>>): this {
    return this.configure('imports', oneOrManyImports);
  }

  public provide(provider: any): this
  public provide(providers: any[]): this
  public provide(oneOrManyProviders: MaybeArray<any>): this {
    return this.configure('providers', oneOrManyProviders);
  }

  public declare(component: Type<any>): this
  public declare(components: Type<any>[]): this
  public declare(oneOrManyComponents: MaybeArray<Type<any>>): this {
    return this.configure('declarations', oneOrManyComponents);
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
    this.import(this.rootComponent);

    await this.testBed.compileComponents();

    this.fixture = this.testBed.createComponent(this.rootComponent);
    this.destroyRef = fromInjector(this.fixture, DestroyRef);
  }
}
