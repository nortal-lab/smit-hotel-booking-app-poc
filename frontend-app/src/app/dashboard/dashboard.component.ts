import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  username = '';
  personalId = '';
  constructor(private readonly keycloakService: KeycloakService) {}

  ngOnInit() {
    const parsedToken = this.keycloakService.getKeycloakInstance().tokenParsed;
    this.username = parsedToken?.['family_name'];
    this.personalId = parsedToken?.['personal_identification_number'];
  }

  login() {
    this.keycloakService.login();
  }

  logout() {
    this.keycloakService.logout();
  }
}
