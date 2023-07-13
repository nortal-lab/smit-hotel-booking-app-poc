import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Room } from '../../models/room.interface';

@Component({
  selector: 'app-price-summary-block',
  templateUrl: './price-summary-block.component.html',
  styleUrls: ['./price-summary-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceSummaryBlockComponent {
  @Input() room?: Room;
}
