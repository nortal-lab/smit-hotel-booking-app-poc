import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Room } from '../../models/room.interface';

@Component({
  selector: 'app-room-reservation-details',
  templateUrl: './room-reservation-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomReservationDetailsComponent {
  @Input() room?: Room;
  @Input() checkInDate?: string;
  @Input() checkOutDate?: string;

  dateFormatString = 'eee, dd.MM.yyyy - HH:mm';
}
