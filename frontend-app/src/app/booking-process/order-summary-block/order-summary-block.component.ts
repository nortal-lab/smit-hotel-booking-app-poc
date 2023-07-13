import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Room } from '../../models/room.interface';

@Component({
  selector: 'app-order-summary-block',
  templateUrl: './order-summary-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderSummaryBlockComponent {
  @Input() room?: Room;
}
