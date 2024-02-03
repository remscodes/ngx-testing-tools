import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { assertComponentCtor } from '../../common/assertion/assert-component-ctor';
import { assertInstance } from '../../common/assertion/assert-instance';
import { shouldCreate } from '../../common/expectation/should-create';
import { HTTP_PROVIDERS } from '../../common/test-bed/http/http-providers';
import { HttpOptions } from '../../common/test-bed/http/models/http-options.model';
import { buildJasmineCallback } from '../../common/test-bed/jasmine/jasmine-callback';
import { RendererTestBedFactory } from '../../common/test-bed/renderer/renderer-test-bed-factory';
import { InjectionStore } from '../../common/test-bed/store/models/injected-store.model';
import { buildComponentTools } from './component-tools';
import { ComponentTestBedOptions } from './models';
import { ComponentCallback } from './models/component-callback.model';

export class ComponentTestBedFactory<ComponentType, Store extends InjectionStore = InjectionStore> extends RendererTestBedFactory<ComponentType, Store> {

  public constructor(
    rootComponent: Type<ComponentType>,
    options: ComponentTestBedOptions = {},
  ) {
    assertComponentCtor(rootComponent);
    super(rootComponent, options);

    const {
      httpTesting = false,
      noTemplate = false,
    } = options;

    if (httpTesting) this.provide(HTTP_PROVIDERS);

    this.httpOptions = { httpTesting };
    this.noTemplate = noTemplate;
  }

  private readonly httpOptions: HttpOptions;
  private readonly noTemplate: boolean;

  private fixture: ComponentFixture<ComponentType> = null!;

  public override async compile(): Promise<void> {
    await super.compile();
    if (this.noTemplate) this.testBed.overrideTemplateUsingTestingModule(this.described, '');
    await this.testBed.compileComponents();
    this.fixture = this.testBed.createComponent(this.described);
  }

  public override setup(action: ComponentCallback<ComponentType, Store['injected']>): jasmine.ImplementationCallback {
    return buildJasmineCallback({
      callback: action,
      deferredTools: () => buildComponentTools(this, this.httpOptions),
    });
  }

  public override shouldCreate(): void {
    shouldCreate(() => {
      assertInstance(this.fixture, ComponentFixture);
      return this.fixture.componentInstance;
    });
  }
}
