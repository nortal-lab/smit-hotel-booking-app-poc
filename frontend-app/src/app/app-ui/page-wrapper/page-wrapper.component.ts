import { Component } from '@angular/core';

@Component({
  selector: 'app-page-wrapper',
  styleUrls: ['./page-wrapper.components.scss'],
  template: `
    <cvi-ng-track flexDirection="vertical" [flexIsMultiline]="true" style="padding-inline: var(--app-page-inline-padding); padding-block: var(--app-page-block-padding);">
      <ng-content></ng-content>
    </cvi-ng-track>
  `,
})
export class PageWrapperComponent {

}
