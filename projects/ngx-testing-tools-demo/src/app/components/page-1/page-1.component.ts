import { ChangeDetectionStrategy, Component, Directive } from '@angular/core';

@Directive({
  selector: 'button[buttonDirective]',
  standalone: true,
})
export class ButtonDirective {}

@Component({
  selector: 'app-page-1',
  standalone: true,
  imports: [
    ButtonDirective,
  ],
  templateUrl: './page-1.component.html',
  styleUrl: './page-1.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Page1Component {

  public isClicked = false;
}
