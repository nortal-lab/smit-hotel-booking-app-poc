import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UiImage } from '../../models/ui/Image.type';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingCardComponent {
  @Input() img!: UiImage;
  @Input() title!: string;
  @Input() summary!: string;
  @Input() price!: string;
}