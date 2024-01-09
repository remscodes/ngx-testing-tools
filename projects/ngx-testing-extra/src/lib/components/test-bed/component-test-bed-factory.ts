import { Type } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { MaybeArray } from '../../models/shared.model';

export class ComponentTestBedFactory<ComponentType> {

  public constructor(
    private rootComponent: Type<ComponentType>,
  ) { }

  private fixture: ComponentFixture<ComponentType> = null!;

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
    TestBed.configureTestingModule({ [key]: defs });
    return this;
  }

  public shouldCreate(): void {
    it('should create', () => {
      expect(this.fixture.componentInstance).toBeTruthy();
    });
  }

  public async compile(): Promise<void> {
    this.import(this.rootComponent);

    await TestBed.compileComponents();

    this.fixture = TestBed.createComponent(this.rootComponent);
  }
}
