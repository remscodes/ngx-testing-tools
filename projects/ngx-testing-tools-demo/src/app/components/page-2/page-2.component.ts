import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-page-2',
  standalone: true,
  imports: [],
  templateUrl: './page-2.component.html',
  styleUrl: './page-2.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Page2Component {

  public clicked: boolean = false;
}
