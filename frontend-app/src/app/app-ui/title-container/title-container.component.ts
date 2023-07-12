import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-container',
  styleUrls: ['./title-container.component.scss'],
  template: `
    <div class="title-wrapper">
      <h1 class="title">{{ title }}</h1>
      <ng-content *ngIf="withLeftContent" select="[titleContainerLeft]"></ng-content>
    </div>
    <ng-content *ngIf="withRightContent" select="[titleContainerRight]"></ng-content>
  `,
})
export class AppTitleContainerComponent {
  @Input() title: string = '';
  @Input() withLeftContent: string = '';
  @Input() withRightContent: boolean = false;
}
