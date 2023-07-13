import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-definition-item',
  templateUrl: './definition-item.component.html',
  styleUrls: ['./definition-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefinitionItemComponent {
  @Input() label!: string;
  @Input() isHighlighted = false;
  
  @HostBinding('class') get getHostClasses(): string {
    return `${this.isHighlighted ? 'is-highlighted' : ''}`;
  }
}
