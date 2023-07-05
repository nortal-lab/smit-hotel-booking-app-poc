import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly keycloakService: KeycloakService) {}

  getParsedToken() {
    return this.keycloakService.getKeycloakInstance().tokenParsed;
  }

  getUsername() {
    const parsedToken = this.getParsedToken();

    return parsedToken?.['family_name'];
  }

  getPersonalIdentificationNumber() {
    const parsedToken = this.getParsedToken();

    return parsedToken?.['personal_identification_number'];
  }

  login() {
    this.keycloakService.login();
  }

  logout() {
    this.keycloakService.logout();
  }
}
