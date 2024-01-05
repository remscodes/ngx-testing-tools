import { ComponentRef, Type } from '@angular/core';
import { ComponentFixture, TestBed, TestBedStatic, TestModuleMetadata } from '@angular/core/testing';
import { ExtraTools } from './extra-bed';

export function describeComponent<T>(component: Type<T>, configDefinitions: ConfigDefinitions<T>): void {
  describe(component.name, () => {
    configDefinitions({ bed: new ExtraDescribe(component, TestBed) });
  });
}

export function xdescribeComponent<T>(component: Type<T>, configDefinitions: ConfigDefinitions<T>): void {
  xdescribe(component.name, () => {
    configDefinitions({ bed: new ExtraDescribe(component, TestBed) });
  });
}

export function fdescribeComponent<T>(component: Type<T>, configDefinitions: ConfigDefinitions<T>): void {
  fdescribe(component.name, () => {
    configDefinitions({ bed: new ExtraDescribe(component, TestBed) });
  });
}

class ExtraDescribe<T> {

  public constructor(
    public componentCtor: Type<T>,
    public parentBed: TestBedStatic = TestBed,
  ) {
    parentBed.configureTestingModule({ imports: [componentCtor] });
  }

  private fixture!: ComponentFixture<T>;

  public import(impts: Type<any>[]): this {
    this.parentBed.configureTestingModule({ imports: impts });
    return this;
  }

  public provide(providers: any[]): this {
    this.parentBed.configureTestingModule({ providers });
    return this;
  }

  public declare(components: Type<any>[]): this {
    this.parentBed.configureTestingModule({ declarations: components });
    return this;
  }

  public configureModule(def: TestModuleMetadata): this {
    this.parentBed.configureTestingModule(def);
    return this;
  };

  public compileBeforeEach(specDefinitions: SpecsDefinitions<T>): void {
    beforeEach(async () => {
      this.fixture = this.parentBed.createComponent(this.componentCtor);
      await this.parentBed.compileComponents();
    });

    this.test(specDefinitions);
  }

  public test(specDefinitions: SpecsDefinitions<T>): void {
    let instance: T;
    let ref: ComponentRef<T>;

    beforeEach(() => {
      instance = this.fixture.componentInstance;
      ref = this.fixture.componentRef;
    });

    shouldCreate(this.fixture.componentInstance);

    // specDefinitions(new Proxy({
    //   fixture: this.fixture,
    //   instance: undefined as any,
    //   ref: undefined as any,
    // }, {
    //
    // }));
  }
}

type SpecsDefinitions<T> = (tools: ExtraTools<T>) => MaybePromise<void>

export interface BedTools<T> {
  bed: ExtraDescribe<T>;
}

type ConfigDefinitions<T> = (tools: BedTools<T>) => void

type MaybePromise<T> =
  | T
  | Promise<T>

function shouldCreate(instance: any): void {
  it('should create', () => expect(instance).toBeTruthy());
}
