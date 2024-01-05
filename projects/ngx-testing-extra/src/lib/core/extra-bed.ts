import { ComponentRef, DebugElement, Type } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';

export class ExtraBed<ComponentType> {

  private constructor(
    private describedComponent: Type<ComponentType>,
  ) {
    this.import(describedComponent);
  }

  public static root<T>(component: Type<T>): ExtraBed<T> {
    return new ExtraBed<T>(component);
  }

  public import(imp: Type<any>): this
  public import(imps: Type<any>[]): this
  public import(oneOrManyImport: Type<any> | Type<any>[]): this {
    const imports: Type<any>[] = (Array.isArray(oneOrManyImport) && oneOrManyImport.length > 1)
      ? oneOrManyImport
      : [oneOrManyImport as Type<any>];
    TestBed.configureTestingModule({ imports });
    return this;

  }

  public provide(provider: any): this
  public provide(providers: any[]): this
  public provide(oneOrManyProviders: any | any[]): this {
    const providers: any[] = (Array.isArray(oneOrManyProviders) && oneOrManyProviders.length > 1)
      ? oneOrManyProviders
      : [oneOrManyProviders as any];
    TestBed.configureTestingModule({ providers });
    return this;
  }

  public declare(components: Type<any>[]): this {
    TestBed.configureTestingModule({ declarations: components });
    return this;
  }

  public configureModule(def: TestModuleMetadata): this {
    TestBed.configureTestingModule(def);
    return this;
  };

  public inject = TestBed.inject;

  public async compile(): Promise<ExtraFn<ComponentType>> {
    await TestBed.compileComponents();

    const fixture: ComponentFixture<ComponentType> = TestBed.createComponent(this.describedComponent);

    const {
      componentInstance: instance,
      debugElement: debug,
      componentRef: ref,
    } = fixture;

    it('should create', () => expect(instance).toBeTruthy());

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

type MaybePromise<T> = T | Promise<T>;
export type ExtraFn<T> = (cb: ExtraCb<T>, opts?: ExtraOptions) => jasmine.ImplementationCallback
export type ExtraCb<T> = (tools: ExtraTools<T>) => jasmine.ImplementationCallback

export interface ExtraTools<T> {
  fixture: ComponentFixture<T>;
  ref: ComponentRef<T>;
  instance: T;
  debug: DebugElement;
}

export interface ExtraOptions {
  autoDetectChanges?: boolean;
}
