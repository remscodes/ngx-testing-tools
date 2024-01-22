import { ProviderToken, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { getComponentAnnotation } from '../../common/annotation/component-annotation';
import { shouldCreate } from '../../common/expectation/should-create';
import { DeclarativeTestBedFactory } from '../../common/test-bed/declarative-test-bed-factory';
import { InjectionStore } from '../../common/test-bed/store/models/injected-store.model';
import { NonEmptyString, PrettyMerge } from '../../shared.model';
import { assertComponentCtor } from './assertions/assert-component-ctor';
import { assertComponentFixture } from './assertions/assert-fixture';
import { buildComponentTools } from './component-tools';
import { ComponentTestBed, ComponentTestBedOptions } from './models';
import { ComponentSetup } from './models/component-setup.model';

export class ComponentTestBedFactory<ComponentType, Store extends InjectionStore = InjectionStore> extends DeclarativeTestBedFactory<ComponentType, Store> {

  public constructor(
    rootComponent: Type<ComponentType>,
    private options: ComponentTestBedOptions = {},
  ) {
    assertComponentCtor(rootComponent);
    super(rootComponent, options);
    (getComponentAnnotation(rootComponent)?.standalone)
      ? this.import(this.described)
      : this.declare(this.described);
  }

  private fixture: ComponentFixture<ComponentType> = null!;

  public override inject<S extends string, T>(name: NonEmptyString<S>, token: ProviderToken<T>): ComponentTestBed<ComponentType, InjectionStore<PrettyMerge<Store['injected'] & { [K in S]: T }>>> {
    return super.inject(name, token) as any;
  }

  public override async compile(): Promise<void> {
    await super.compile();
    await this.testBed.compileComponents();
    this.fixture = this.testBed.createComponent(this.described);
  }

  public override setup(action: ComponentSetup<ComponentType, Store['injected']>): jasmine.ImplementationCallback {
    return (action.length > 1)
      ? (done: DoneFn) => action(buildComponentTools(this), done)
      : () => action(buildComponentTools(this), null!);
  }

  public override shouldCreate(): void {
    shouldCreate(() => {
      assertComponentFixture(this.fixture);
      return this.fixture.componentInstance;
    });
  }
}
