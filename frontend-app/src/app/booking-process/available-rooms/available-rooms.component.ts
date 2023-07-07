import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RoomDTO } from '../../models/room.interface';

@Component({
  selector: 'app-available-rooms',
  templateUrl: './available-rooms.component.html',
  styleUrls: ['./available-rooms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvailableRoomsComponent {
  @Input() rooms?: RoomDTO[];

  @Output() onClick = new EventEmitter<void>();

  click() {
    this.onClick.emit();
  }
}
