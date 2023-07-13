import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-section',
  templateUrl: './data-section.component.html',
  styleUrls: ['./data-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataSectionComponent {
  @Input() title!: string;
}
