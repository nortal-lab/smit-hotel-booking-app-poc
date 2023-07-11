import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconsRegistry } from '@egov/cvi-ng';
import { cviLoupe } from '@egov/cvi-icons';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private registry: IconsRegistry, private readonly authService: AuthService) {
    this.registry.registerIcons([cviLoupe]);
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
