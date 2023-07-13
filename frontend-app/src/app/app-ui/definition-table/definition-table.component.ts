import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-definition-table',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./definition-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefinitionTableComponent {
  @Input() hasZebraStripes = false;
  
  @HostBinding('class') get getHostClasses(): string {
    return `${this.hasZebraStripes ? 'has-zebra-stripes' : ''}`;
  }
}
