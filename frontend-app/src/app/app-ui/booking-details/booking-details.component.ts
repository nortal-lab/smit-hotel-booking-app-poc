import { Component, Input } from '@angular/core';
import { UiImage } from '../../models/ui/Image.type';

@Component({
  selector: 'app-booking-details',
  styleUrls: ['./booking-details.component.scss'],
  templateUrl: './booking-details.component.html',
})
export class BookingDetailsComponent {
  @Input() img!: UiImage;
}
