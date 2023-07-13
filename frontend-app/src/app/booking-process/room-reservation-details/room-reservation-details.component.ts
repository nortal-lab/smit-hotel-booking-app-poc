import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Room } from '../../models/room.interface';

@Component({
  selector: 'app-room-reservation-details',
  templateUrl: './room-reservation-details.component.html',
  styleUrls: ['./room-reservation-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomReservationDetailsComponent {
  @Input() room?: Room;
}
