import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-page-1',
  templateUrl: './page-1.component.html',
  styleUrl: './page-1.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class Page1Component {

}
