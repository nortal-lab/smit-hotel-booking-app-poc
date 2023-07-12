import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

@Component({
  selector: 'app-page-content-wrapper',
  templateUrl: './page-content-wrapper.component.html',
  styleUrls: ['./page-content-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageContentWrapperComponent {
}
