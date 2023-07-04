import { Component } from '@angular/core';
import { IconsRegistry } from '@egov/cvi-ng';
import { cviLightBulb } from '@egov/cvi-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend-app';

  constructor(private registry: IconsRegistry) {
    this.registry.registerIcons([cviLightBulb]);
  }
}
