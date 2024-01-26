import { ProviderToken, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { shouldCreate } from '../../common/expectation/should-create';
import { buildJasmineCallback } from '../../common/test-bed/action-callback';
import { RendererTestBedFactory } from '../../common/test-bed/renderer/renderer-test-bed-factory';
import { InjectionStore } from '../../common/test-bed/store/models/injected-store.model';
import { NonEmptyString, PrettyMerge } from '../../shared.model';
import { assertComponentCtor } from './assertions/assert-component-ctor';
import { assertComponentFixture } from './assertions/assert-fixture';
import { buildComponentTools } from './component-tools';
import { ComponentTestBed, ComponentTestBedOptions } from './models';
import { ComponentCallback } from './models/component-test-bed.models';

export class ComponentTestBedFactory<ComponentType, Store extends InjectionStore = InjectionStore> extends RendererTestBedFactory<ComponentType, Store> {

  public constructor(
    rootComponent: Type<ComponentType>,
    options: ComponentTestBedOptions = {},
  ) {
    assertComponentCtor(rootComponent);
    super(rootComponent, options);

    const {
      noTemplate = false,
    } = options;

    if (noTemplate) this.testBed.overrideTemplateUsingTestingModule(this.described, '');
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

  public override setup(action: ComponentCallback<ComponentType, Store['injected']>): jasmine.ImplementationCallback {
    return buildJasmineCallback(this, action, buildComponentTools);
  }

  public override shouldCreate(): void {
    shouldCreate(() => {
      assertComponentFixture(this.fixture);
      return this.fixture.componentInstance;
    });
  }
}
