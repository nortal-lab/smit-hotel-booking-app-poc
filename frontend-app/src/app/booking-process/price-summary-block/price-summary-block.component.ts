import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Room, RoomData } from '../../models/room.interface';

@Component({
  selector: 'app-price-summary-block',
  templateUrl: './price-summary-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceSummaryBlockComponent {
  @Input() roomData?: RoomData;
}
