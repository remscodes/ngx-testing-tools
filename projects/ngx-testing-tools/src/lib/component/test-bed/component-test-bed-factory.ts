import { ProviderToken, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { getComponentAnnotation } from '../../common/annotation/component-annotation';
import { shouldCreate } from '../../common/expectation/should-create';
import { CustomTestBedFactory } from '../../common/test-bed/custom-test-bed-factory';
import { InjectionStore } from '../../common/test-bed/store/models/injected-store.model';
import { MaybeArray, NonEmptyString, PrettyMerge } from '../../shared.model';
import { makeArray } from '../../util/array.util';
import { assertComponent } from './assertions/assert-component';
import { assertComponentFixture } from './assertions/assert-fixture';
import { buildComponentTools } from './component-tools';
import { ComponentTestBed } from './models';
import { ComponentSetup } from './models/component-setup.model';
import { Declaration } from './models/metadata-type.model';

export class ComponentTestBedFactory<ComponentType, Store extends InjectionStore = InjectionStore> extends CustomTestBedFactory<ComponentType, Store> {

  public constructor(rootComponent: Type<ComponentType>) {
    assertComponent(rootComponent);
    super(rootComponent);
    (getComponentAnnotation(rootComponent)?.standalone)
      ? this.import(this.described)
      : this.declare(this.described);
  }

  private fixture: ComponentFixture<ComponentType> = null!;

  private declarations: Set<Declaration> = new Set();

  /**
   * Declares one non-standalone component, directive or pipe into the `ComponentTestBed`.
   */
  public declare(declaration: Declaration): this
  /**
   * Declares many non-standalone components, directives and pipes into `ComponentTestBed`.
   */
  public declare(declarations: Declaration[]): this
  public declare(oneOrManyDeclarations: MaybeArray<Declaration>): this {
    makeArray(oneOrManyDeclarations).forEach(v => this.declarations.add(v));
    return this;
  }

  public override inject<S extends string, T>(name: NonEmptyString<S>, token: ProviderToken<T>): ComponentTestBed<ComponentType, InjectionStore<PrettyMerge<Store['injected'] & { [K in S]: T }>>> {
    return super.inject(name, token) as any;
  }

  public override async compile(): Promise<void> {
    await super.compile();
    this.testBed.configureTestingModule({
      declarations: [...this.declarations.values()],
    });
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
