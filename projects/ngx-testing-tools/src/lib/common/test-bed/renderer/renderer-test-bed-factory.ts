import { isStandalone, SchemaMetadata, Type } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MaybeArray } from '../../../shared.model';
import { appendSet } from '../../../util/set.util';
import { BaseTestBedFactory } from '../base/base-test-bed-factory';
import { BaseTools } from '../base/models/base-tools.model';
import { Declaration } from '../models/metadata-type.model';
import { InjectionStore } from '../store/models/injected-store.model';
import { RendererTestBedOptions } from './models/renderer-test-bed-options.model';

export abstract class RendererTestBedFactory<
  InstanceType,
  Store extends InjectionStore = InjectionStore,
  Tools extends BaseTools = BaseTools
> extends BaseTestBedFactory<InstanceType, Store, Tools> {

  protected constructor(
    described: Type<InstanceType>,
    options: RendererTestBedOptions = {},
  ) {
    super(described, options);

    const {
      declarations = [],
      schemas = [],
      noopAnimations = true,
    } = options;

    this.declarations = new Set(declarations);
    this.schemas = new Set(schemas);

    if (noopAnimations) this.provide(provideNoopAnimations());

    (isStandalone(this.described))
      ? this.import(this.described)
      : this.declare(this.described);
  }

  protected declarations: Set<Declaration>;
  protected schemas: Set<SchemaMetadata>;

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
  }
}
