import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconsRegistry } from '@egov/cvi-ng';
import { AuthService } from './services/auth.service';
import { from } from 'rxjs';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isLoggedIn$ = from(this.authService.isLoggedIn());

  constructor(private registry: IconsRegistry, private readonly authService: AuthService) {
    this.registry.registerIcons([]);
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  protected readonly faRightFromBracket = faRightFromBracket;
}
