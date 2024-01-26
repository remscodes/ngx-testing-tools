import { isStandalone, SchemaMetadata, Type } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Declaration } from '../../../component/test-bed/models/metadata-type.model';
import { MaybeArray } from '../../../shared.model';
import { makeArray } from '../../../util/array.util';
import { BaseTestBedFactory } from '../base/base-test-bed-factory';
import { InjectionStore } from '../store/models/injected-store.model';
import { RendererTestBedOptions } from './models/renderer-test-bed-options.model';

export abstract class RendererTestBedFactory<Instance, Store extends InjectionStore = InjectionStore> extends BaseTestBedFactory<Instance, Store> {

  protected constructor(
    described: Type<Instance>,
    options: RendererTestBedOptions = {},
  ) {
    super(described, options);

    const {
      declarations = [],
      schemas = [],
      noopAnimations = true,
      ingestDescribed = true,
    } = options;

    this.declarations = new Set(declarations);
    this.schemas = new Set(schemas);

    if (noopAnimations) this.providers.add(provideNoopAnimations());
    if (ingestDescribed) (isStandalone(this.described))
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
    makeArray(oneOrManyDeclarations).forEach(v => this.declarations.add(v));
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
