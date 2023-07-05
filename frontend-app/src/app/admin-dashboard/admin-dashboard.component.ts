import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  user$?: Observable<User>;
  constructor(private readonly authService: AuthService) {}

  ngOnInit() {
    this.user$ = this.authService.user$;
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
