import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-circular-button',
  templateUrl: './circular-button.component.html',
  styleUrls: ['./circular-button.component.scss'],
})
export class CircularButtonComponent {
  @Input() kind: 'button' | 'container' = 'button';
  @Output() clickEvent = new EventEmitter();
  
  onClick(): void {
    this.clickEvent.emit();
  }
}
