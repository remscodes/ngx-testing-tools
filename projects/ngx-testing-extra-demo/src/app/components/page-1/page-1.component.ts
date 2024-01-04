import { ChangeDetectionStrategy, Component, Directive } from '@angular/core';

@Directive({
  selector: 'button[buttonDirective]',
  standalone: true,
})
export class ButtonDirective {}

@Component({
  selector: 'app-page-1',
  templateUrl: './page-1.component.html',
  styleUrl: './page-1.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ButtonDirective],
})
export class Page1Component {

  public isClicked = false;
}
