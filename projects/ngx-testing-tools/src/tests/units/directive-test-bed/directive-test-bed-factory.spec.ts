import { DirectiveTestBedFactory } from '../../../lib/directive-test-bed/directive-test-bed-factory';
import { OuterComponent } from '../../fixtures/components/outer.component';
import { MyButtonDirective } from '../../fixtures/directives/my-button.directive';

describe('DirectiveTestBedFactory default options', () => {
  new DirectiveTestBedFactory(MyButtonDirective, OuterComponent);
});
