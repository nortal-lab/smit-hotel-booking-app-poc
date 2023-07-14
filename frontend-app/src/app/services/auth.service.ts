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
    familyName: '',
    givenName: '',
    email: '',
    personalIdentificationNumber: '',
  };

  private userSubject$: BehaviorSubject<User> = new BehaviorSubject(this.initialUserValue);
  user$ = this.userSubject$.asObservable();

  constructor(private readonly keycloakService: KeycloakService, private readonly router: Router) {}

  async init() {
    if (await this.isLoggedIn()) {
      const role = this.getUserRole();

      this.setUser(role);

      if (role === UserRoles.EMPLOYEE) {
        this.router.navigate(['/admin']);
      }
    }
  }

  isLoggedIn() {
    return this.keycloakService.isLoggedIn();
  }

  private setUser(role: UserRoles) {
    this.userSubject$.next({
      familyName: this.getFamilyName(),
      givenName: this.getGivenName(),
      email: this.getEmail(),
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

  private getFamilyName() {
    const parsedToken = this.getParsedToken();
    return parsedToken?.['family_name'];
  }

  private getGivenName() {
    const parsedToken = this.getParsedToken();
    return parsedToken?.['given_name'];
  }

  private getEmail() {
    const parsedToken = this.getParsedToken();
    return parsedToken?.['email'];
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
