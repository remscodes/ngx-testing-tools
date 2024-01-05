import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-page-2',
  templateUrl: './page-2.component.html',
  styleUrl: './page-2.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class Page2Component {

  public checked: boolean = false;
}
