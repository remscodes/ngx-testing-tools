import { isStandalone, SchemaMetadata, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { assertInstance } from '../../assertions/assert-instance';
import { shouldCreate } from '../../expectations/should-create';
import { MaybeArray } from '../../shared.models';
import { BaseTools } from '../../tools/base/models/base-tools.model';
import { InjectionStore } from '../../tools/store/models/injected-store.model';
import { appendSet } from '../../utils/set.util';
import { BaseTestBedFactory } from '../base/base-test-bed-factory';
import { Declaration } from '../models/metadata-type.models';
import { RendererTestBedOptions } from './models/renderer-test-bed-options.model';

export abstract class RendererTestBedFactory<
  DescribedType,
  Store extends InjectionStore = InjectionStore,
  Tools extends BaseTools = BaseTools,
  HostType = DescribedType,
> extends BaseTestBedFactory<DescribedType, Store, Tools> {

  protected constructor(
    described: Type<DescribedType>,
    private host: Type<HostType>,
    options: RendererTestBedOptions,
  ) {
    super(described, options);

    const {
      declarations = [],
      schemas = [],
      startDetectChanges = true,
      noopAnimations = true,
      noTemplate = false,
    } = options;

    this.startDetectChanges = startDetectChanges;
    this.noTemplate = noTemplate;

    this.declarations = new Set(declarations);
    this.schemas = new Set(schemas);

    if (noopAnimations) this.provide(provideNoopAnimations());

    (isStandalone(this.host))
      ? this.import(this.host)
      : this.declare(this.host);

    (isStandalone(this.described))
      ? this.import(this.described)
      : this.declare(this.described);
  }

  protected readonly startDetectChanges: boolean;
  protected readonly noTemplate: boolean;

  protected declarations: Set<Declaration>;
  protected schemas: Set<SchemaMetadata>;

  protected _fixture: ComponentFixture<HostType> = null!;

  protected get fixture(): ComponentFixture<HostType> {
    assertInstance(this._fixture, ComponentFixture);
    return this._fixture;
  }

  protected createHostFixture(): void {
    this._fixture = this.testBed.createComponent(this.host);
  }

  /**
   * Declares one non-standalone component, directive or pipe into the custom test bed.
   */
  public declare(declaration: Declaration): this
  /**
   * Declares many non-standalone components, directives and pipes into the custom test bed.
   */
  public declare(declarations: Declaration[]): this
  public declare(oneOrManyDeclarations: MaybeArray<Declaration>): this {
    appendSet(this.declarations, oneOrManyDeclarations);
    return this;
  }

  public override async compile(): Promise<void> {
    await super.compile();
    this.testBed.configureTestingModule({
      declarations: [...this.declarations.values()],
      schemas: [...this.schemas.values()],
    });
    if (this.noTemplate) this.testBed.overrideTemplateUsingTestingModule(this.host, '');
    await this.testBed.compileComponents();
  }

  public override shouldCreate(): void {
    shouldCreate(() => this.fixture.componentInstance);
  }
}
