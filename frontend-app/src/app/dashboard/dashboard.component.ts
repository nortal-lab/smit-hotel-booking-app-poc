import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  username = '';
  personalId = '';
  constructor(private readonly authService: AuthService) {}

  ngOnInit() {
    this.username = this.authService.getUsername();
    this.personalId = this.authService.getPersonalIdentificationNumber();
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
