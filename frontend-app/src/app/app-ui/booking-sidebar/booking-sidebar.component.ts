import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UiImage } from '../../models/ui/Image.type';

@Component({
  selector: 'app-booking-sidebar',
  templateUrl: './booking-sidebar.component.html',
  styleUrls: ['./booking-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingSidebarComponent {
  @Input() img!: UiImage;
}
