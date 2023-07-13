import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CviIconName } from '@egov/cvi-icons';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent {
  @Input() iconName!: CviIconName;
  @Output() clickEvent = new EventEmitter();

  onClick(): void {
    this.clickEvent.emit();
  }
}
