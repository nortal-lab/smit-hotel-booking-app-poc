import { Injectable, OnDestroy } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from '../models/user.interface';
import { UserRoles } from '../models/user-roles.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private initialUserValue: User = {
    role: UserRoles.CUSTOMER,
    username: '',
    personalIdentificationNumber: '',
  };

  private userSubject$: BehaviorSubject<User> = new BehaviorSubject(this.initialUserValue);
  user$ = this.userSubject$.asObservable();

  constructor(private readonly keycloakService: KeycloakService, private readonly router: Router) {}

  async init() {
    const isLoggedIn = await this.keycloakService.isLoggedIn();
    if (isLoggedIn) {
      const role = this.getUserRole();

      this.setUser(role);

      if (role === UserRoles.EMPLOYEE) {
        this.router.navigate(['/admin']);
      }
    }
  }

  private setUser(role: UserRoles) {
    this.userSubject$.next({
      username: this.getUsername(),
      personalIdentificationNumber: this.getPersonalIdentificationNumber(),
      role,
    });
  }

  private getUserRole() {
    const parsedToken = this.getParsedToken();

    return parsedToken?.['resource_access']?.['hotel-app']?.roles[0] === UserRoles.EMPLOYEE ? UserRoles.EMPLOYEE : UserRoles.CUSTOMER;
  }

  private getParsedToken() {
    return this.keycloakService.getKeycloakInstance().tokenParsed;
  }

  private getUsername() {
    const parsedToken = this.getParsedToken();
    return parsedToken?.['family_name'];
  }

  private getPersonalIdentificationNumber() {
    const parsedToken = this.getParsedToken();

    return parsedToken?.['personal_identification_number'];
  }

  getAuthToken() {
    return this.keycloakService.getToken();
  }

  login() {
    return this.keycloakService.login();
  }

  logout() {
    return this.keycloakService.logout().then(() => {
      this.userSubject$.next(this.initialUserValue);
    });
  }

  ngOnDestroy() {
    this.userSubject$.complete();
  }
}
