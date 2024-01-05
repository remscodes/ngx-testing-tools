import { Type } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { shouldCreate } from './expect/should-create';
import { ExtraCb, ExtraFn, ExtraOptions } from './models';

export class ExtraBed<ComponentType> {

  private constructor(
    private describedComponent: Type<ComponentType>,
  ) { }

  public static root<T>(component: Type<T>): ExtraBed<T> {
    return new ExtraBed<T>(component);
  }

  public import(imp: Type<any>): this
  public import(imps: Type<any>[]): this
  public import(oneOrManyImports: Type<any> | Type<any>[]): this {
    return this.configure('imports', oneOrManyImports);

  }

  public provide(provider: any): this
  public provide(providers: any[]): this
  public provide(oneOrManyProviders: any | any[]): this {
    return this.configure('providers', oneOrManyProviders);
  }

  public declare(component: Type<any>): this
  public declare(components: Type<any>[]): this
  public declare(oneOrManyComponents: Type<any> | Type<any>[]): this {
    return this.configure('declarations', oneOrManyComponents);
  }

  private configure(key: keyof TestModuleMetadata, itemS: any | any[]): this {
    const defs: any[] = Array.isArray(itemS) ? itemS : [itemS];
    TestBed.configureTestingModule({ [key]: defs });
    return this;
  }

  public async compile(): Promise<ExtraFn<ComponentType>> {
    this.import(this.describedComponent);

    await TestBed.compileComponents();

    const fixture: ComponentFixture<ComponentType> = TestBed.createComponent(this.describedComponent);

    const {
      componentInstance: instance,
      debugElement: debug,
      componentRef: ref,
    } = fixture;

    shouldCreate(instance);

    return (cb: ExtraCb<ComponentType>, opts?: ExtraOptions) => {

      const { autoDetectChanges = true } = opts ?? {};

      if (autoDetectChanges) fixture.detectChanges();

      return cb({
        fixture,
        instance,
        debug,
        ref,
      });
    };
  }
}
