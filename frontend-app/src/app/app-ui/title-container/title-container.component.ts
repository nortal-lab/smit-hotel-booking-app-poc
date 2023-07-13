import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-container',
  styleUrls: ['./title-container.component.scss'],
  template: `
    <h1 class="title">{{ title }}</h1>
    <ng-content *ngIf="withContentRight"></ng-content>
  `,
})
export class TitleContainerComponent {
  @Input() title: string = '';
  @Input() withContentRight: boolean = false;
}
