import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Room } from '../../../models/room.interface';
import { UiImage } from '../../../models/ui/Image.type';
import { faBed, faRulerCombined, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-available-rooms',
  templateUrl: './available-rooms.component.html',
  styleUrls: ['./available-rooms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvailableRoomsComponent {
  @Input() rooms?: Room[];
  @Input() buttonTitle = 'Book';
  @Input() showButton = true;

  @Output() onClick = new EventEmitter<Room>();

  protected readonly faUser = faUser;
  protected readonly faBed = faBed;
  protected readonly faRulerCombined = faRulerCombined;

  roomImage: UiImage = {
    src: '/assets/images/room.jpg',
    alt: 'Room Image',
  };

  click(room: Room) {
    this.onClick.emit(room);
  }
}
