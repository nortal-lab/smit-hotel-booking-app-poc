import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { from } from 'rxjs';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { UserRoles } from '../app/models/user-roles.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly faRightFromBracket = faRightFromBracket;
  isLoggedIn$ = from(this.authService.isLoggedIn());
  user$ = from(this.authService.user$);
  userRoles = UserRoles;

  constructor(private readonly authService: AuthService, readonly router: Router) {}

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
